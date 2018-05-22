# atransform
## props
```
sourceTableData: [
 {
   id: '001',
   // 关于用户的名字
   name: '霍会潮',
   // 关于用户的描述
   describe: 'AAA业务系统',
   // 用户有的联系方式key值，对应focusType.notifyTypeKey
   notifyType: 'email'
 }...],
targetTableData: [
 {
   'id': '011',
   'name': '孙悟空',
   'describe': '天擎系统平台',
   notifyType: 'telephone'
 }...
],
// 关注用户的通信方式
focusType: {
 notifyTypeText: '短信',
 notifyTypeKey: 'telephone'
}
```

## events
```
@getCheckedData="getCheckedData(val)"
val为右边的列表数据
```
