

export function param2Obj(url){
  console.log("传入的url",url)
  const search = url.split('?')[1]
  if(!search){
    return {}
  }
  console.log("返回的url",search,JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'))
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}