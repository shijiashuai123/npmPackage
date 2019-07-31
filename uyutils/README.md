uyutils
========

some utils

## Install

``` sh

$ npm install uyutils --save

```

## Usage
``` sh
    import uyutils from 'uyutils'
```

``` html
    <!--your.vue-->
    <script>
    export default {
        data () {
            return {
            }
        }
        create () {
            uyutils.randomWord() // 获取随机数 // 生成3-32位随机串：randomWord(true, 3, 32)// 生成43位随机串：randomWord(false, 43)
            uyutils.formatTime, // 时间戳转时间格式
            uyutils.sliceUrl, // 截取url里面的任意参数值，两个参数（第一个url，第二个参数名字）
            uyutils.numTurnWord, //　阿拉伯数字转文字
            uyutils.wordTurnNum, // 文字数字转为阿拉伯数字
            uyutils.createPinyin, // 文字转拼音
            uyutils.generateUUID // 生成uuid
        }
    }
    </script>
```

