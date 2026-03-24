
# Python 起源

Python 的设计哲学：优雅、明确、简单
Python 语言是一种解释型、面向对象、动态数据类型的高级程序设计语言
Python 支持命令式编程（How to do）、函数式 编程（What to do），完全支持面向对象程序设计， 语法简洁清晰，拥有大量的几乎支持所有领域应用 开发的成熟扩展库

# Python 的发展与现状

- Redhat: 世界上最流行的 Linux 发行版本中的 yum 包管理工具就是用 python 开发的
- Instagram: 美国最大的图片分享社交网站，每天超过 3 千万张照片被分享，全部用 python 开发
- YouTube: 世界上最大的视频网站 YouTube 就是用 Python 开发的
- NASA: 美国航天局 (NASA) 大量使用 Python 进行数据分析和运算
- 知乎: 国内最大的问答社区，通过 Python 开发 (国外 Quora)
- 豆瓣: 公司几乎所有的业务均是通过 Python 开发的
- 除上面之外，还有搜狐、金山、腾讯、盛大、网易、百度、阿里、淘宝、土豆、新浪、果壳等公司都在使用 Python 完成各种各样的任务。

# Python 优点

- 底层以及很多标准库是用 C 语言写的，规范的代码免费开源高级语言优点可移植性解释性面向对象运行速度非常快。
- 高级语言编程时候无需考虑程序使用的内存一类的底层细节。
- Python 已经被移植在许多平台上丰富的类库可嵌入性可扩展性 （Linux、Windows 等）
- Python 语言写的程序不需要编译成二进制代码，直接从源代码运行程序
- Python 采用强制缩进的方式使得代码具有较好可读性
- Python 标准库强大，如正则表达式、电子邮件、图像库之类。被称为“胶水语言”，能够联结其他语言的各种模块（尤其是 C/C++）
- 
## 一、优雅、简单、明确

入门简单，深入进去后可以开发出功能强大的程序。

```c
#include<stdio.h>
main()
{
	printf("hello world!");
}
```

```python
print('hello world')
```

## 二、良好的可扩展性

Python 有大量的第三方模块，覆盖了科学计算、Web 开发、数据接口、图形系统等众多领域，开发的代码通过很好的封装，也可以作为第三方模块给别人使用。如 Pandas、Numpy、 Seaborn、Scikit-learn 等等

## 三、Python 具有丰富和强大的库

Python 常被昵称为胶水语言，能够把用其他语言制作的各种模块（尤其是 C/C++）很轻松地联结在一起，满足不同应用领域的需求。
比如我们要做一个考勤系统， 人脸识别算法用 C++ 语言编写， 考勤的管理是 python 编写，就可 以将 C++ 整块移动到 python 中。

# Python 的应用

- 系统编程：提供 API，方便系统维护和管理。
- 图形处理：有 PIL、Tkinter 等图形库支持，有利于图像处理。
- 数学处理：NumPy 扩展提供大量与许多标准数学库的接口。
- 文本处理：re 模块能支持正则表达式，还提供 SGML，XML 分析模块，许多程序员利用 python 进行 XML 程序的开发。
- 数据库编程：程序员可通过遵循 PythonDB-API（数据库应用程序编程接口）规范的模块与 MicrosoftSQLServer，Oracle，Sybase，DB2，MySQL、SQLite 等数据库通信。python 自带有一个 Gadfly 模块，提供了一个完整的 SQL 环境。
- 网络编程：提供丰富的模块支持 sockets 编程，能方便快速地开发分布式应用程序。很多大规模软件开发计划例如 Zope，Mnet 及 BitTorrent.Google 都在广泛地使用它网络编程：提供丰富的模块支持 sockets 编程，能方便快速地开发分布式应用程序。很多大规模软件开发计划例如 Zope，Mnet 及 BitTorrent.Google 都在广泛地使用它。
- Web 编程：应用的开发语言，支持最新的 XML 技术。
- 多媒体应用：PyOpenGL 模块封装了“OpenGL 应用程序编程接口”，能进行二维和三维图像处理。 PyGame 模块可用于编写游戏软件。
- 黑客编程：python 有一个 hack 的库，内置了你熟悉的或不熟悉的函数，但是缺少成就感。

## Python 的应用场景

![](attachments/python基础/file-20260306142132377.png)

## Python 的应用方向

![](attachments/python基础/file-20260306142132382.png)

# Python 的开发环境

## Python 的版本发展

Python 2.x 系列已于 2020 年全面放弃维护和更新
Python 也因此分为了 Python 3.5 派系和 Python 2.7 派系两大阵营
![](attachments/python基础/file-20260306142132387.png)

## Python shell

![](attachments/python基础/file-20260306142132394.png)

# Python 的编程特点与规范

## Python 的特点

1、Python 使用 C 语言开发，但是 Python 不再有 C 语言中的指针等复杂的数据类型。
2、Python 具有很强的面向对象特性，而且简化了**面向对象**的实现。它消除了保护类型、抽象类、接口等面向对象的元素。
3、Python 仅有 **33 个保留字**，而且没有分号、begin、end 等标记。

![](attachments/python基础/file-20260306142132398.png)

![](attachments/python基础/file-20260306142132406.png)

## 动态数据类型

- Python 定义对象的方法很简单，**无须预先的声明语句，也没有必要指定值的类型**
- Python 使用“动态类型”机制，只要需要，某个对象引用都可以重新引用到不同的对象。

![](attachments/python基础/file-20260306142132412.png)

## 标识符命名规则

- 文件名、类名、模块名、变量名及函数名等标识符的第一个字符必须是字母表中字母或下划线 `'_'。`
- 标识符的其他的部分由字母、数字和下划线组成，且标识符对**大小写字母**敏感。
- 关键字不能用于命名变量，如 and、as、assert、break、class、 continue、def、del 等

## 代码缩进

Python 程序是依靠代码块的缩进来体现代码之间的逻辑关系的。

- 一般以 4 个空格或制表符（按 Tab 键) 为基本缩进单位。
- 缩进量相同的一组语句，称为一个语句块或程序段。
- 同一个级别的代码块的缩进量必须相同。
- 注意：空格的缩进方式与制表符的缩进方式不能混用。

## 程序中的注释语句

- 单行注释以“#” 符号和一个空格开头。如果在语句行内注释（即语句与注释同在一行），注释语句符与语句之间至少要用两个空格分开。
- 多行注释用三个单引号 ''' 或者三个双引号 """ 将注释括起来

![](attachments/python基础/file-20260306142132418.png)

## 代码过长的折行处理

当一行代码较长，需要折行（换行）时，可以使用反斜杠’\’延续行。

例如：
```python
io3 = can.create_oval(65,70,185,170, outline='yellow', fill='yellow')
```

可以写成：

```python
io = can.create_oval(65,70,185,170,\
outline='yellow',\
fill='yellow')
```
