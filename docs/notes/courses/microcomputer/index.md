# 微机原理与应用

[打开复习路线、实验调试与综合题 →](study-guide.md)

这门课以 80C51 单片机为主线，覆盖结构、指令、汇编程序、中断、定时/计数、串行通信和系统接口；后半部分扩展到 ARM Cortex-M3/M4 与 STM32 外设。

## 知识地图

| 模块 | 要回答的问题 | 笔记 |
| --- | --- | --- |
| 体系结构 | CPU、存储器、I/O 端口如何协同？ | [80C51 基础结构](architecture.md) |
| 指令系统 | 操作数在哪里，指令如何改变数据和标志位？ | [80C51 指令系统](instruction-set.md) |
| 程序设计 | 如何把算法变成可执行的汇编流程？ | [汇编程序设计](assembly.md) |
| 中断 | 如何响应外部事件并保护现场？ | [中断系统](interrupts.md) |
| 定时/计数 | 如何生成时间基准、测量脉冲或产生周期信号？ | [定时器与计数器](timers.md) |
| 串口 | 如何配置帧格式、波特率并可靠收发？ | [串行通信](serial.md) |
| 接口扩展 | 如何连接存储器、键盘、显示器和串行总线？ | [接口扩展](interfaces.md) |
| Cortex-M | 如何把 8051 的概念迁移到 32 位微控制器？ | [Cortex-M 与 STM32](cortex-m.md) |

## 推荐复习顺序

1. 先画出 8051 的程序存储器、内部数据存储器、外部数据存储器和特殊功能寄存器边界。
2. 用短程序练习寻址方式、标志位、跳转范围和堆栈变化。
3. 再学习中断、定时器和串口。每个外设都按“时钟来源 → 控制寄存器 → 标志位 → 初始化 → 服务流程”整理。
4. 最后学习外部总线、键盘显示和 Cortex-M/STM32，把接口信号与程序配置对应起来。

## 先记住的边界

| 目标 | 典型访问方式 | 关键区别 |
| --- | --- | --- |
| 片内数据 RAM / SFR | `MOV` | 内部数据空间；SFR 通常用直接寻址 |
| 片外数据 RAM | `MOVX` | 独立的外部数据空间，通常经 `DPTR` 或 `R0/R1` 间接访问 |
| 程序存储器中的常量表 | `MOVC` | 从代码空间读取，常用 `A+DPTR` 或 `A+PC` 变址 |
| 片外程序存储器 | 取指周期由硬件控制 | `/PSEN` 为低有效读选通信号 |

经典 12T 80C51 的机器周期为 12 个振荡周期，计时/计数计算必须先确认晶振频率和芯片的分频实现。兼容内核可能采用 1T 或其他时钟配置，不能直接照搬经典数值。

## 课堂资料

以下为资料文件夹中的课堂课件、复习资料和练习材料。教材类电子书不收录在网站资源中。

### 课堂课件

- [第 1 讲：绪论](resources/01-introduction.pdf)
- [第 2 讲：80C51 基本结构](resources/02-8051-architecture.pdf)
- [第 3 讲：80C51 指令系统](resources/03-8051-instruction-set.pdf)
- [第 4 讲：80C51 汇编程序设计](resources/04-assembly-programming.pdf)
- [第 5 讲：中断系统](resources/05-interrupts.pdf)
- [第 6 讲：定时器/计数器](resources/06-timers-counters.pdf)
- [第 7 讲：串行口原理与应用](resources/07-serial-communication.pdf)
- [第 8 讲：并行扩展](resources/08-parallel-expansion.pdf)
- [第 8 讲：串行总线扩展](resources/08-serial-expansion.pdf)
- [键盘与显示接口](resources/08-keyboard-display.pdf)
- [Cortex-M3/M4 内核](resources/09-cortex-m-architecture.pdf)
- [Cortex-M 与 STM32 外设编程](resources/10-cortex-m-programming.pdf)

### 复习与练习

- [2026 复习提要](resources/2026-review-notes.pdf)
- [期末复习扫描版（36 页）](resources/final-review-scan.pdf)
- [微机原理与应用题库](resources/question-bank.pdf)
- [2024-2025 学年爱班回忆卷](resources/final-exam-2024-2025.pdf)
- [2025-2026 学年爱迪生班回忆卷](resources/final-exam-2025-2026.pdf)
- [爱班模拟卷（含详解）](resources/mock-exam-1-solutions.pdf)
- [爱班合模拟卷二（含答案）](resources/mock-exam-2-answers.pdf)
- [回忆卷完整解答](resources/recalled-exam-solutions.pdf)

这些 PDF 由浏览器直接打开；扫描版没有可检索文本，笔记中的知识点仍以本页的 Markdown 分章内容为入口。
