## analysis_ua_browserslist

> 根据 browserslist 分析用户 ua

## usage

```
简介
根据文件(json/csv), 像从 redash 导出的数据

使用
$ uio analysis -f <filename> -k <selectKeyPath>
$ uio help

Commands
analysis analysis a file get useragent analysis message

command analysis Options
-f --filename select a file path
-k --keyPath select the useragent path in data
```

## 扩展

可以在 plugins 注册分析函数

目前注册有两个：

1. 根据 browserslist 分析用户 UA 命中情况
2. 根据 UA 结果集，做用户设备类型分析

## private

---

## LICENSE

[MIT](./LICENSE)
