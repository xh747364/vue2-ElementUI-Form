/**
 * 新增错误
 * @param arr Array
 * @description 错误列表
 * 
 * @param newArr Object
 * @description 新增错误 标识 type，内容 text
 * 
 * @description 注：type判断唯一标识 需要给元素指定 ref=type，如果text修改也会触发更新
 */
interface formItem {
	type: string;
	text: string;
	[prop: string]: any;
}
export const useErrPush = (arr: formItem[], newArr: formItem): formItem[] => {
	let flag = false;
	arr.forEach((x) => {
		if (x.type == newArr.type) {
			flag = true;
			if (x.text != newArr.text) {
				x.text = newArr.text;
			}
		}
	});
	if (!flag) {
		arr.push(newArr);
	}
	return arr;
	// return flag ? arr : arr.push(newArr) && arr;
};
/**
   * 移除错误
   * @param arr Array
   * @description 错误列表
   * 
   * @param type String
   * @description 要移除的 type
   */
export const useErrDel = (arr: formItem[], type: string): formItem[] => {
	let flag = -1;
	arr.forEach((x, k) => {
		x.type == type ? (flag = k) : false;
	});
	flag == -1 ? arr : arr.splice(flag, 1);
	return arr;
};
