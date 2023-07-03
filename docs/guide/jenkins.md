---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2023-06-08
---

# Jenkins自动部署


## Jenkins远程部署到目标服务器

### 安装Publish Over SSH插件
### 开启window服务器的ssh服务
你可能之前在自己的 PC 上搞过SSH的相关内容，不妨先在本地查看下SSH服务
1. Win+R键入cmd，回车，打开命令提示符 或者打开 Windows PowerShell
2. 在命令提示符里键入ssh
![图 1](/images/20230608064653.png)  
> 如果有上图中的输出，则可跳过安装ssh的部分

#### ssh下载
当前的Win10、win11版本已经支持OpenSSH服务。Win 10默认程序已经安装好了OpenSSH 客户端
**Windows设置–>应用–>应用和功能-可选功能**
![图 2](/images/20230608064951.png)  
若在你的已安装列表里面没有OpenSSH 服务端，单击添加功能找到OpenSSH 服务端等待安装完毕即可，下载完毕根据提示可能需要重启电脑（我没有提示重启）。之后，就可以再次在cmd中键入ssh查看自己的ssh服务是否已成功启动。若安装完后，cmd中还是没有上图中的显示，则考虑是环境变量的问题
#### ssh服务开启
如果ssh链接中，出现`connect to host port 22 connection refused`这个代码报错提示，就证明ssh服务没有打开，或者以下图所示，也是证明ssh服务没有开启
![图 3](/images/20230608065219.png)  

按一下步骤执行，可以去开启ssh服务
1. Win+S，键入服务，打开本地服务界面，找到OpenSSH SSH Server，启动方式改为自动
   ![图 4](/images/20230608065330.png)  

明天来进行宿主机和容器主机，ssh链接