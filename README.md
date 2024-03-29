# Live2D看板娘 for VSCode

一个简单的Live2D看板娘插件，会跟随你的鼠标动作变化，写代码累了可以逗逗她哦。支持自定义设置live2d模型。

GitHub: https://github.com/iCharlesZ/vscode-live2d

VSCode Marketplace: https://marketplace.visualstudio.com/items?itemName=CharlesZ.vscode-live2d

model library: https://github.com/iCharlesZ/vscode-live2d-models

**If you want to use the English version, please select {"vscode-live2d.English": true}.**  English translation is not perfect, Please help me improve the translation.

<br />

## Preview 预览
![效果](./res/demo.gif)

<br />

## Install and Uninstall 安装与卸载

需要 VSCode 1.47.0 以上版本才可以安装此插件！

如果是以System身份安装的VSCode，则需要以管理员身份运行VSCode才可以正常使用看板娘插件。

如果安装了node.js环境，在卸载扩展后一段时候内会执行自动清理删除残留的样式。
如果没有安装node.js环境，则卸载前需要手动在设置里将看板娘设置成关闭。或者在 settings.json 中设置 {"vscode-live2d.enabled": false}，然后再卸载插件。如果直接删除插件会有遗留。

> tips: 如果找不到设置面板在哪，可点击左下角 “齿轮——设置” 打开设置面板(确保活动栏: activity bar是打开状态)，然后搜索 "@ext:charlesz.vscode-live2d" 即可看到vscode-live2d设置选项。
或者点击左边活动栏(activity bar)中的扩展(extension)找到vscode-live2d，点击右下角的小齿轮选择扩展设置也能直接进入设置选项。

<br />

## Warning 警告

**本插件是通过修改 VSCode 的 javascript 文件的方式运行。** 所以会在初次安装，或者 VSCode 升级的时候，会出现损坏提示，请选择 【不再提示】。

**如果实在介意此提示请不要安装此扩展！！！**

<br />

## Extended Settings 扩展设置

|配置 | 描述
|-----|------------
|`vscode-live2d.enabled`| true:启用插件、false:禁用插件
|`vscode-live2d.English`| true: use English、false: 使用中文
|`vscode-live2d.model`| 选择看板娘模型
|`vscode-live2d.modelUrl`| 自定义导入模型url
|`vscode-live2d.modelWidth`| 自定义看板娘宽度
|`vscode-live2d.modelHeight`| 自定义看板娘高度
|`vscode-live2d.moveX`| 自定义看板娘水平位置
|`vscode-live2d.moveY`| 自定义看板娘垂直位置
|`vscode-live2d.opacity`| 设置看板娘透明度
|`vscode-live2d.pointerOverHidden`| 鼠标移至上方时隐藏看板娘
|`vscode-live2d.pointerPenetration`| 设置看板娘鼠标穿透
|`vscode-live2d.position`| 设置看板娘左右定位
|`vscode-live2d.talk`| 看板娘对话气泡开关

<br />

## Q&A 常见问题


Q: It seems that nothing happens after installing the extension? 安装完插件后，似乎没有反应？

A: Make sure to have the administrator authority！！ 如果不能使用，请确保你有管理员权限！！

---

Q: How to uninstall? 怎么卸载插件？

A: Before uninstall, you need to set {"vscode-live2d.enabled": false} in the settings. 卸载前需要在设置里将看板娘设置成关闭。

---

Q: How to remove [unsupported] tag? 怎么去除顶部的[不受支持]的标志？

A: see here: https://github.com/lehni/vscode-fix-checksums


<br />

## Release Notes 版本说明

### 1.8.1 | 2022-08-11

- 支持 VSCode 1.70.1 以上版本

### 1.8.0 | 2021-11-29

- 修复新版本 VSCode 不能正常显示的问题

### 1.7.0 | 2020-11-19

- 增加英文版本
- Added English version

### 1.6.0 | 2020-08-28

- 鼠标悬浮看板娘时暂时隐藏看板娘

### 1.5.0 | 2020-08-04

- 增加看板娘对话气泡开关

### 1.4.0 | 2020-08-04

- 增加看板娘鼠标穿透选项(开启穿透会影响看板娘鼠标交互)
- 增加看板娘定位right，left选项
- 调整看板娘大小设置最大最小值
- 调整看板娘位置设置最大最小值

### 1.3.0 | 2020-07-29

- 移除jQuery相关
- 添加与看板娘的鼠标交互

### 1.2.0 | 2020-07-27

- 增加看板娘宽度高度设置
- 增加看板娘水平垂直位置设置
- 增加看板娘透明度设置

### 1.1.0 | 2020-07-25

- 添加了更多的妹子模型
- 减少了本地模型数量，改成联网获取model，安装插件更快了(切换模型一定要联网)
- 支持以url形式自定义导入live2d模型

### 1.0.0 | 2020-07-25

- 正式版发布

### 0.1.1 | 2020-07-23

- 第一版发布

<br />

## Thanks 感谢

没有这些开源项目，就不会有这个插件的出现

* [live2d-widget](https://github.com/stevenjoezhang/live2d-widget)
* [vscode-background](https://github.com/shalldie/vscode-background)

<br />

**Enjoy!**
