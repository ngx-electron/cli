# @ngx-electron/cli

ngx-electron 命令行工具
## 使用

### 查看帮助

```
ngx-electron -h
```

```
Usage: ngx-electron <command> [options]

Options:
  -V, --version                 output the version number
  --aot                         Build using Ahead of Time compilation.
  --base-href [value]           Base url for the application being built.
  --browser-target [value]      Target to serve.
  --common-chunk                Use a separate bundle containing code used across
 multiple bundles.
  -c, --configuration [value]   A named configuration environment, as specified i
n the "configurations" section of angular.json.
  --deploy-url [value]          URL where files will be deployed.
  --disable-host-check          Don't verify connected clients are part of allowe
d hosts.
  --eval-source-map             Output in-file eval sourcemaps.
  --hmr                         Enable hot module replacement.
  --hmr-warning                 Show a warning when the --hmr option is enabled.
  --host [value]                Host to listen on. (default: "localhost")
  --live-reload                 Whether to reload the page on change, using live-
reload.
  -o, --open                    Opens the url in default browser.
  --optimization                Enables optimization of the build output.
  --poll                        Enable and define the file watching poll time per
iod in milliseconds.
  --port [value]                Port to listen on. (default: 4200)
  --prod                        When true, sets the build configuration to the pr
oduction environment.
      All builds make use of bundling and limited tree-shaking, A production buil
d also runs limited dead code elimination using UglifyJS.
  --progress                    Log progress to the console while building.
  --proxy-config [value]        Proxy configuration file.
  --public-host [value]         Specify the URL that the browser client will use.

  --serve-path [value]          The pathname where the app will be served.
  --serve-path-default-warning  Show a warning when deploy-url/base-href use unsu
pported serve path values.
  --source-map                  Output sourcemaps.
  --ssl                         Serve using HTTPS.
  --ssl-cert [value]            SSL certificate to use for serving HTTPS.
  --ssl-key [value]             SSL key to use for serving HTTPS.
  --vendor-chunk                Use a separate bundle containing only vendor libr
aries.
  --vendor-source-map           Resolve vendor packages sourcemaps.
  --verbose                     Adds more details to output logging.
  --watch                       Rebuild on change.
  -s, --server                  设置加载的页面来自于服务器
  -h, --help                    output usage information

Commands:
  *                             启动应用程序
  help [cmd]                    display help for [cmd]

```

### 启动一个ngx-electron应用


#### 启动加载本地资源（修改文件应用不能刷新，不利于开发）
```
ngx-electron .
```

#### 启动加载服务器资源（适于在开发中使用，修改文件会刷新，可指定上面的其它选项[angular启动选项]）


```
ngx-electron . --server
```

建议使用hmr选项（热更新适于开发）

```
ngx-electron . --server --hmr
```

