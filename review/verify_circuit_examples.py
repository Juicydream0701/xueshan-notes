from pathlib import Path
import json
import math
import cmath
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
checks = []


def near(label, actual, expected, tol=1e-8):
    a = np.asarray(actual)
    e = np.asarray(expected)
    err = float(np.max(np.abs(a-e)))
    assert err <= tol, (label, actual, expected, err)
    checks.append({'check': label, 'max_error': err})


def solve(n, impedances, currents=(), voltages=(), vccs=()):
    # Node 0 is reference. Branch current directions are a -> b, including
    # the MNA current unknown of an independent voltage source V(a)-V(b).
    A = np.zeros((n+len(voltages), n+len(voltages)), dtype=complex)
    rhs = np.zeros(n+len(voltages), dtype=complex)
    def stamp(a,b,g):
        if a: A[a-1,a-1] += g
        if b: A[b-1,b-1] += g
        if a and b:
            A[a-1,b-1] -= g
            A[b-1,a-1] -= g
    for a,b,z in impedances:
        stamp(a,b,1/z)
    for a,b,i in currents:
        if a: rhs[a-1] -= i
        if b: rhs[b-1] += i
    for k,(a,b,v) in enumerate(voltages):
        if a:
            A[a-1,n+k] += 1
            A[n+k,a-1] += 1
        if b:
            A[b-1,n+k] -= 1
            A[n+k,b-1] -= 1
        rhs[n+k] = v
    for a,b,c,d,g in vccs:
        for node,sgn in [(a,1),(b,-1)]:
            if node:
                if c: A[node-1,c-1] += sgn*g
                if d: A[node-1,d-1] -= sgn*g
    x = np.linalg.solve(A,rhs)
    v = np.r_[0,x[:n]]
    total = 0j
    for a,b,z in impedances:
        u = v[a]-v[b]
        total += u*np.conj(u/z)
    for a,b,i in currents:
        total += (v[a]-v[b])*np.conj(i)
    for k,(a,b,_) in enumerate(voltages):
        total += (v[a]-v[b])*np.conj(x[n+k])
    for a,b,c,d,g in vccs:
        total += (v[a]-v[b])*np.conj(g*(v[c]-v[d]))
    assert abs(total) < 1e-8, total
    return v, x[n:]


# 01: independently rebuild the networks instead of only substituting their equations.
v,j = solve(2,[(1,2,2),(2,0,4)],voltages=[(1,0,12)])
near('01 ex1 series current / node voltage',[(-j[0]).real,v[2].real],[2,8])
v,_ = solve(1,[(1,0,2)],currents=[(0,1,1)],vccs=[(0,1,1,0,.1)])
near('01 ex3 dependent source',v[1],2.5)
v,j = solve(3,[(1,2,2),(2,0,4),(1,3,3),(3,0,6),(2,3,7)],voltages=[(1,0,12)])
near('01 ex5 balanced bridge',[v[2],v[3],-j[0]],[8,8,10/3])
tri = [11/3,11,11/2]
near('01 exercise B delta equivalence',1/(1/tri[0]+1/(tri[1]+tri[2])),3)
v,_ = solve(2,[(1,2,10000),(2,0,10000),(2,0,10000)],voltages=[(1,0,12)])
near('01 ex6 loading with 10k meter',v[2],4)
v,_ = solve(2,[(1,2,10000),(2,0,10000),(2,0,10000000)],voltages=[(1,0,12)])
near('01 ex6 loading with 10M meter',v[2],5.997001499250375)
near('01 ex7 pulse energy increment',.5*2e-6*(7**2-3**2),40e-6)

# 02: node/supernode/mesh/supermesh/dependent control.
v,_ = solve(2,[(1,0,2),(1,2,4),(2,0,4)],currents=[(0,1,3)])
near('02 ex1 node voltages',v[1:],[4.8,2.4])
v,j = solve(2,[(1,0,2),(2,0,4)],currents=[(0,2,1)],voltages=[(1,2,6)])
near('02 ex2 supernode',[v[1],v[2],j[0]],[10/3,-8/3,-5/3])
v,j = solve(2,[(1,2,2),(2,0,1),(2,0,3)],voltages=[(1,0,10)])
near('02 ex3 physical circuit currents',[-j[0],v[2]/3,v[2]],[40/11,10/11,30/11])
v,j = solve(2,[(1,2,4),(2,0,6)],currents=[(0,2,1)],voltages=[(1,0,12)])
near('02 ex4 supermesh',[-j[0],v[2]/6,v[2]],[.6,1.6,9.6])
v,_ = solve(2,[(1,0,2),(1,2,4),(2,0,4)],currents=[(0,1,3)],vccs=[(0,2,1,0,.25)])
near('02 ex5 VCCS node voltages',v[1:],[6,6])
v,_ = solve(2,[(1,2,2),(2,0,3)],currents=[(2,0,1)],voltages=[(1,0,10)])
near('02 exercise A',v[2],4.8)
v,j = solve(2,[(1,0,3),(2,0,6)],voltages=[(1,2,9)])
near('02 exercise B supernode',np.r_[v[1:],j],[3,-6,-1])
v,j = solve(2,[(1,2,4),(2,0,6)],currents=[(0,2,2)],voltages=[(1,0,20)])
near('02 exercise C supermesh',[-j[0],v[2]/6,v[2]],[.8,2.8,16.8])
v,_ = solve(2,[(1,2,2),(2,0,4)],voltages=[(1,0,10)],vccs=[(2,0,1,2,.25)])
near('02 ex6 CCCS expressed through physical control branch',v[2],5)

# 03: independent port states and symmetry, including the true internal efficiency.
v,_ = solve(2,[(1,2,2),(2,0,3)],currents=[(0,2,1)],voltages=[(1,0,10)])
near('03 ex1 superposition final node / power',[v[2],abs(v[2])**2/3],[7.2,17.28])
v,j = solve(2,[(1,2,3),(2,0,6),(2,0,2)],voltages=[(1,0,12)])
near('03 ex2 loaded port / efficiency',[v[2],(abs(v[2])**2/2)/(12*(-j[0]).real)],[4,.25])
v,_ = solve(1,[(1,0,2),(1,0,4)],currents=[(0,1,1)],vccs=[(0,1,1,0,.25)])
near('03 ex3 dependent-source loaded voltage',v[1],2)
for title,u,z,r,p in [('03 ex4 pure resistor',12,3+4j,5,9),('03 exercise A pure resistor',20,6+8j,10,12.5),('04 maxpower pure resistor',10,3+4j,5,6.25),('07 q4 pure resistor',10,4+3j,5,50/9)]:
    near(title,u*u*r/abs(z+r)**2,p)
    # Independent finite-difference check that this is a stationary maximum.
    for factor in [.999,1.001,.1,10]:
        assert u*u*(r*factor)/abs(z+r*factor)**2 <= p+1e-9
v,_ = solve(2,[(1,0,2),(2,0,3),(1,2,4)],currents=[(0,1,1)])
near('03 reciprocity state 1',v[1:],[14/9,2/3])
v,_ = solve(2,[(1,0,2),(2,0,3),(1,2,4)],currents=[(0,2,1)])
near('03 reciprocity state 2',v[1:],[2/3,2])

# 04: complex MNA plus resistor/source power balance (built into solve).
v,j = solve(3,[(1,2,6),(2,3,10j),(3,0,-4j)],voltages=[(1,0,60)])
near('04 ex1 phasor',[(-j[0]),v[1]-v[2],v[2]-v[3],v[3]],[5-5j,30-30j,50+50j,-20-20j])
v,j = solve(2,[(1,2,2),(2,0,4),(2,0,4j)],voltages=[(1,0,10)])
near('04 ex2 AC nodes / source current',[v[2],-j[0]],[6+2j,2-1j])
q1 = 1000*math.tan(math.acos(.6)); q2=1000*math.tan(math.acos(.95))
near('04 ex3 compensation capacitor uF',(q1-q2)/(2*math.pi*50*220**2)*1e6,66.07,.005)
w1=math.sqrt(1000**2+50**2)-50; w2=w1+100
near('04 ex4 exact half power frequencies',[w1,w2],[951.249219725,1051.249219725],1e-8)
for w in [w1,w2]:
    reactance=w*.1-1/(w*1e-5)
    near('04 ex4 half-power identity',abs(10/(10+1j*reactance))**2,.5)
near('04 ex5 parallel current',100/50+100/100j+100/(-50j),2+1j)
near('04 exercise1 phasor',20/math.sqrt(2)*cmath.exp(-1j*math.pi/6)/(4-3j),2*math.sqrt(2)*cmath.exp(1j*math.radians(6.869897645844)),1e-9)

# 05: independently integrate the differential equations with RK4.
def rk4(rhs, x0, duration, step=1e-4):
    x=np.array(x0,dtype=float); t=0
    for k in range(round(duration/step)):
        a=rhs(t,x); b=rhs(t+step/2,x+step*a/2); c=rhs(t+step/2,x+step*b/2); d=rhs(t+step,x+step*c)
        x += step*(a+2*b+2*c+d)/6; t += step
    return x

for t in [.01,.1]:
    uc=rk4(lambda t,x:np.array([((15-x[0])/3000-x[0]/6000)/1e-5]),[2],t,1e-5)[0]
    near('05 ex1 integrated original RC topology',uc,10-8*math.exp(-50*t),1e-8)
for t in [.01,.1]:
    il=rk4(lambda t,x:np.array([-5*x[0]/.1]),[.4],t,1e-5)[0]
    near('05 ex2 integrated RL',il,.4*math.exp(-50*t),1e-9)
for t in [.1,1]:
    il=rk4(lambda t,x:np.array([10*math.cos(t)-x[0]]),[0],t)[0]
    near('05 ex4 sinusoidal switching',il,5*math.cos(t)+5*math.sin(t)-5*math.exp(-t),1e-10)
for R in [4.,10.,12.5]:
    for t in [.2,1.]:
        uc,ic=rk4(lambda t,x:np.array([x[1]/.04,10-R*x[1]-x[0]]),[0,0],t)
        if R==4:
            exact=10*(1-math.exp(-2*t)*(math.cos(math.sqrt(21)*t)+2/math.sqrt(21)*math.sin(math.sqrt(21)*t)))
            iexact=10/math.sqrt(21)*math.exp(-2*t)*math.sin(math.sqrt(21)*t)
            near('05 ex5 underdamped current',ic,iexact,1e-10)
        elif R==10: exact=10*(1-(1+5*t)*math.exp(-5*t))
        else: exact=10-40/3*math.exp(-2.5*t)+10/3*math.exp(-10*t)
        near('05 ex5 RLC all damping regimes independent ODE integration',uc,exact,1e-9)
near('05 ex5 peak overshoot',math.exp(-2*math.pi/math.sqrt(21)),.2538267219801087,1e-8)

# 06: integrate time-domain waveforms over a whole period to check harmonics.
theta=np.linspace(0,2*math.pi,200001)
u=2+10*math.sqrt(2)*np.cos(theta)+5*math.sqrt(2)*np.cos(2*theta)
i=10*np.cos(theta+math.pi/4)+math.sqrt(40)*np.cos(2*theta+math.atan(.5))
avg=lambda y:np.trapezoid(y,theta)/(2*math.pi)
near('06 ex1 direct waveform RMS/power',[avg(u*u),avg(i*i),avg(u*i)],[129,70,70],1e-9)
ur=4*np.cos(theta)+4/math.sqrt(13)*np.cos(2*theta-math.atan(1.5))
near('06 RLC harmonics direct average power',avg(ur*ur),112/13,1e-9)
vp=120*np.exp(1j*np.array([0,-2*math.pi/3,2*math.pi/3]))
R=np.array([10,20,30]); vn=sum(vp/R)/sum(1/R); currents=(vp-vn)/R
near('06 ex4 floating neutral',vn,420/11-1j*60*math.sqrt(3)/11)
near('06 ex4 load currents',currents,[90/11+1j*6*math.sqrt(3)/11,-54/11-1j*30*math.sqrt(3)/11,-36/11+1j*24*math.sqrt(3)/11])
near('06 ex4 total power',sum(abs(currents)**2*R),2356.3636363636365)
for phi in [0,30,60,75]:
    vp=400/math.sqrt(3)*np.exp(1j*np.array([0,-2*math.pi/3,2*math.pi/3]))
    ip=10*np.exp(1j*(np.array([0,-2*math.pi/3,2*math.pi/3])-math.radians(phi)))
    wa=((vp[0]-vp[1])*ip[0].conjugate()).real
    wc=((vp[2]-vp[1])*ip[2].conjugate()).real
    ss=sum(vp*np.conj(ip))
    near('06 two wattmeter actual wiring complex products',[wa+wc,math.sqrt(3)*(wc-wa)],[ss.real,ss.imag])

# 07: every numerical problem cross-checked against original physical constraints.
v,j=solve(2,[(1,0,2),(1,2,4)],currents=[(0,1,1)],voltages=[(2,0,8)])
near('07 q1 corrected node and voltage source current',[v[1],j[0]],[4,-1])
v,_=solve(2,[(1,2,6),(2,0,3)],voltages=[(1,0,12)],vccs=[(2,0,2,0,.1)])
near('07 q2 Thevenin voltage',v[2],10/3)
v,j=solve(2,[(1,2,2),(2,0,4)],currents=[(0,2,1)],voltages=[(1,0,6)])
near('07 q3 supermesh',[-j[0],v[2]/4,v[2]],[1/3,4/3,16/3])
near('07 q5 RC crossing time milliseconds',.03*math.log(2)*1000,20.7944154168,1e-8)
theta=np.linspace(0,math.pi,200001)
i=2+math.sqrt(2)*np.cos(2*theta-math.pi/4)+1/math.sqrt(10)*np.cos(6*theta-math.atan(3))
near('07 q7 time-domain mean square',np.trapezoid(i*i,theta)/math.pi,5.05)
vp=100*np.exp(1j*np.array([0,-2*math.pi/3,2*math.pi/3])); R=np.array([10,20,20])
vn=sum(vp/R)/sum(1/R); il=(vp-vn)/R
near('07 q8 floating neutral and power',[vn,sum(abs(il)**2*R)],[25,1875])
near('07 q9 precise relative change',(12/6.2-2)/2,-.032258064516129)

# 08: solve the coupled coil equations as a complex matrix with load constraints.
w=1000.; L1=.02; L2=.08; M=.02; RL=60.
I=np.linalg.solve(np.array([[1j*w*L1,1j*w*M],[1j*w*M,RL+1j*w*L2]]),np.array([10,0]))
near('08 ex2 coil currents and load voltage',np.r_[I,-RL*I[1]],[1/12-7j/12,-1/12+1j/12,5-5j])
near('08 ex2 input / output power',[10*I[0].conjugate().real,RL*abs(I[1])**2],[5/6,5/6])
near('08 ex3 transformer input/output powers',[120/(2+32),((120/(2+32))*2)**2*8,(120/(2+32))**2*2],[60/17,115200/289,7200/289])
z=np.array([[6,4],[4,7]],dtype=float); y=np.linalg.inv(z)
near('08 ex4 independent inverse y',y,np.array([[7,-4],[-4,6]])/26)
near('08 ex4 loaded input impedance',6-16/(7+6),62/13)
S=np.array([[1,2],[0,1.]])@np.array([[1,0],[.1,1]])
near('08 exercise3 cascade transfer',S,[[1.2,2],[.1,1]])
near('08 exercise3 loaded input impedance',(S[0,0]*10+S[0,1])/(S[1,0]*10+S[1,1]),7)

out=ROOT/'review/circuit-crosscheck-results.json'
out.write_text(json.dumps({'checks_passed':len(checks),'checks':checks},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'All {len(checks)} independent checks passed; {out}')
