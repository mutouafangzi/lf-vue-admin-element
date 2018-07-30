# atransform
## props
```
// 下拉列表的数据，需要的是一个树结构的数据，数组
:treeData: [{ 
 'label': '全部',
 'children': [
   {
     'id': 'uuid1',
     'label': '执行l'
   }, {
     'id': '3-1',
     'label': '二级 3-1'
   }, {
     'id': '3-2',
     'label': '三级 3-2'
   },
   {
     'id': 'uuid2',
     'label': 'label2'
   }, {
     'id': '31-2',
     'label': '二级 31-2'
   }, {
     'id': '3-4',
     'label': '三级 3-4'
   }
 ]
}]
```

## events
```
@getInputData="getCheckedData(val)"
val为下拉列表中选中的值
```
