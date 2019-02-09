# @ngx-electron/cli

ngx-electron 命令行工具，用于创建angular-electron应用，启动angular-electron应用（可以选择本地运行，和以服务的方式运行【建议使用热替换，创建的应用支持此功能】）

## 全局安装

```
npm install -g @ngx-electron/cli
```

## 使用

安装完成后，使用ngx-electron命令创建应用并启动应用

```
ngx-electron new demo --data # 创建一个@ngx-electron/core和@ngx-electron/data的项目 因为需要下载依赖包所以可能比较慢 可以使用--skip-install选项取消下载
ngx-electron server-start ./demo --hmr # 启动angular项目在4200端口，然后electron会加载这这个端口的页面 此时如果修改代码 electron应用会刷新
```

### 查看帮助

```
ngx-electron --help
```

```
Usage: ngx-electron <command> [options]

Options:
  -V, --version                        output the version number
  -h, --help                           output usage information

Commands:
  server-start|ss [options] <project>  启动服务运行web页面，然后应用来加载服务上的web页面
  local-start|ls [options] <project>   编译并加载本地页面
  new|n [options] <projectName>        创建一个angular, electron应用

```

查看命令帮助
```
ngx-electron new --help
ngx-electron server-start --help
ngx-electron local-start --help
ngx-electron build --help
```

### 创建应用(创建完项目后需要运行npm i 来下载所需的依赖包)
```
ngx-electron new <projectName> [options]
```
projectName指定创建应用的名字
options选项  目前只有 --data 来指定是否使用ngrx （使用ngrx可以很好的做到多个窗口间的数据同步）

#### 创建一个简单的项目 基于@ngx-electron/core

```
ngx-electron new test
```

#### 创建一个ngrx的项目 基于@ngx-electron/core和@ngx-electron/data 可以通过ngrx实现实时的数据同步

```
ngx-electron new test --data
```


### 启动加载本地资源（修改文件应用不能刷新，不推荐）


```
ngx-electron local-start|ls <project> [options]
```
project指定启动应用的位置(同electron命令的参数), 如果当前目录启动使用 .
options启动选项 此选项可参见 angular-cli的ng build的可选选项, ngx-electron local-start 内部需要对angular命令时行打包

例如
```
ngx-electron local-start .
```

### 启动加载服务器资源（适于在开发中使用，修改文件会刷新，可指定上面的其它选项）

```
ngx-electron server-start|ss <project> [options]
```
project指定启动应用的位置, 同上一样
options启动选项 此选项可参见 angular-cli的ng serve的可选选项, ngx-electron server-start 内部需要启动angular应用 然后用electron对其时行网络加载

例如
```
ngx-electron server-start .
```

建议使用hmr选项（热更新适于开发，使用ngx-electron new命令创建的应用支持此功能）

```
ngx-electron server-start . --hmr
```

### 构建应用（Mac windows Linux）

```
ngx-electron build . --mac
ngx-electron build . --win
ngx-electron build . --linux
```

可以自定义electron-builder.json

