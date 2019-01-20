# @ngx-electron/cli

ngx-electron 命令行工具，用于创建angular-electron应用，启动angular-electron应用（可以选择本地运行，和以服务的方式运行【用于开发使用热替换】）

## 全局安装

```
npm install -g @ngx-electron/cli
```

## 使用

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
```

### 创建应用(创建完项目后需要运行npm i 来下载所需的依赖包)


#### 创建一个简单的项目 基于@ngx-electron/core

```
ngx-electron new angular-electron
```

#### 创建一个ngrx的项目 基于@ngx-electron/core和@ngx-electron/data 可以通过ngrx实现实时的数据同步

```
ngx-electron new angular-electron --data
```


### 启动加载本地资源（修改文件应用不能刷新，不推荐）


```
ngx-electron server-start .
```

### 启动加载服务器资源（适于在开发中使用，修改文件会刷新，可指定上面的其它选项）


```
ngx-electron local-start .
```

建议使用hmr选项（热更新适于开发）

```
ngx-electron local-start . --hmr
```

