"""Assemble the print edition from the already-built chapter HTML, using stdlib only."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit
from html import escape
import posixpath,re

ROOT=Path(__file__).resolve().parents[1]
COURSE=ROOT/'site/notes/courses/circuit-theory'
CHAPTERS=['01-models-laws','02-equations','03-theorems','04-ac','05-transients','06-three-phase','07-problems','08-coupling-twoports']

class Transform(HTMLParser):
    def __init__(self,body,chapter,prefix):
        super().__init__(convert_charrefs=False);self.output=[];self.base='https://local/notes/courses/circuit-theory/topics/'+chapter+'/';self.prefix=prefix;self.feed(body)
    def tag(self,t,attrs,closing=''):
        # Chapters get h2; subordinate headings shift one level for a single book h1.
        outtag='h'+str(min(int(t[1])+1,6)) if re.fullmatch(r'h[1-6]',t) else t
        result=[]
        for k,v in attrs:
            if v is None:result.append(k);continue
            if k=='id':v=self.prefix+'-'+v
            if k in ('href','src'):
                if v.startswith('#'):v='#'+self.prefix+'-'+v[1:]
                elif not urlsplit(v).scheme and not v.startswith('//'):
                    u=urlsplit(urljoin(self.base,v));v=posixpath.relpath(u.path,'/notes/courses/circuit-theory')
                    if u.path.endswith('/'):v+='/'
                    if u.query:v+='?'+u.query
                    if u.fragment:v+='#'+u.fragment
            result.append(f'{k}="{escape(v,quote=True)}"')
        self.output.append('<'+outtag+(' '+' '.join(result) if result else '')+closing+'>')
    def handle_starttag(self,t,a):self.tag(t,a)
    def handle_startendtag(self,t,a):self.tag(t,a,' /')
    def handle_endtag(self,t):
        if re.fullmatch(r'h[1-6]',t):t='h'+str(min(int(t[1])+1,6))
        self.output.append('</'+t+'>')
    def handle_data(self,d):self.output.append(d)
    def handle_entityref(self,n):self.output.append('&'+n+';')
    def handle_charref(self,n):self.output.append('&#'+n+';')
    def handle_comment(self,d):pass

def main():
    sections=[]
    for i,chapter in enumerate(CHAPTERS,1):
        source=(COURSE/'topics'/chapter/'index.html').read_text(encoding='utf8')
        match=re.search(r'<article\b[^>]*>(.*?)</article>',source,re.S)
        if not match:raise RuntimeError(f'Chapter article missing: {chapter}')
        prefix=f'chapter-{i:02d}'
        html=''.join(Transform(match[1],chapter,prefix).output)
        sections.append(f'<section class="chapter" id="{prefix}">{html}</section>')
    template=(ROOT/'docs/notes/courses/circuit-theory/handout.html').read_text(encoding='utf8')
    result=re.sub(r'(<main id="handout-chapters">).*?(</main>)',lambda m:m[1]+'\n'+'\n'.join(sections)+'\n'+m[2],template,flags=re.S)
    (COURSE/'handout.html').write_text(result,encoding='utf8')
    print(f'Print edition: {len(sections)} chapters, {len(result):,} characters')

if __name__=='__main__':main()
