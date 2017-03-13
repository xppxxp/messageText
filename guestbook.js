window.onload=function(){


	var oUser=document.getElementById('user');
	var oReg=document.getElementById('reg');
	var oLogin=document.getElementById('login');
	var oUserinfo=document.getElementById('userinfo');
	var ousername1=document.getElementById('username1');
	var oMsg=document.getElementById('verifyUserNameMsg');

//更新用户状态
	function getCookie(key){
		var arr1=document.cookie.split('; ');
		for (var i = 0; i < arr1.length; i++) {
			var arr2=arr1[i].split('=');
			if (arr2[0]==key) {
				return arr2[1];
			};
		};
	}
	function updatastatus(){

		var uid=getCookie('uid');
		var username=getCookie('username');
	if (uid) {
		//如果是登录状态
		oUser.style.display='block';
		oUserinfo.innerHTML=username;
		oReg.style.display='none';
		oLogin.style.display='none';
	}else{

		oUser.style.display='none';
		oUserinfo.innerHTML='';
		oReg.style.display='block';
		oLogin.style.display='block';

	}
	}
	

	//验证用户名
	ousername1.onblur=function(){
		ajax('get','guestbook/index1.php','m=index&a=verifyUserName&username='+this.value,function(data){
		
			var d=JSON.parse(data);
			oMsg.innerHTML=d.message;
			//给提示的文字变颜色
			if(!d.code){
				oMsg.style.color='red';
			}else{
				oMsg.style.color='blue';
			}

		})
	}

	//用户注册
	var oRegBtn=document.getElementById('btnReg');
	var password1=document.getElementById('password1');

	oRegBtn.onclick=function(){
		ajax('post','guestbook/index1.php','m=index&a=reg&username='+encodeURI(ousername1.value)+
			'&password='+encodeURI(password1.value),function(data){
				var d=JSON.parse(data);
				alert(d.message);
		})
	}

	//用户登录
	//
	var oUsername2=document.getElementById('username2');
	var oPassword2=document.getElementById('password2');
	var oLoginBtn=document.getElementById('btnLogin');

	oLoginBtn.onclick=function(){

		ajax('post','guestbook/index1.php','m=index&a=login&username='+encodeURI(oUsername2.value)+
			'&password='+oPassword2.value,function(data){
				var d=JSON.parse(data);
				alert(d.message);
				if (!d.code) {
					updatastatus();
				};
		})
	}

	//用户登出
	var oLogout=document.getElementById('logout');

	oLogout.onclick=function(){

		ajax('get','guestbook/index1.php','m=index&a=logout',function(data){
			updatastatus();
		});

		return false;
	}
	//留言
	
	var oBtnPost=document.getElementById('btnPost');
	var oContent=document.getElementById('content');
	var oList=document.getElementById('list');
	var oShowmore=document.getElementById('showMore');
	var onOff=false;
	var iPage=1;
	//获取更多数据
	oShowmore.onclick=function(){
		iPage++;
		getList()
	}
 //初始化留言加载
 	getList();
 //封装获取留言列表函数
 	function getList(){
 		ajax('get','guestbook/index1.php','m=index&a=getList&n=4&page='+iPage,function(data){
		var d=JSON.parse(data);

		if (iPage==d.data.Pages) {oShowmore.style.display='none';alert(1)};
		if (d.code) {
			oList.innerHTML='快来抢沙发吧';
			oShowmore.style.display='none';
			onOff=true;
		}else{
		var arr=d.data.list;
		for (var i = 0; i < arr.length; i++) {
			createList(arr[i]);
		}}
	})
 	}
	
	//留言添加
	oBtnPost.onclick=function(){
		if (onOff) {oList.innerHTML='';onOff=false;oShowmore.style.display='block'};
		ajax('post','guestbook/index1.php','m=index&a=send&content='+encodeURI(oContent.value),function(data){
			var d=JSON.parse(data);
			alert(d.message);
			//添加留言到列表中
			if (!d.code) {

				createList(d.data,true);



			};
		})
	}
	//封装动态获得留言函数
		function createList(data,insert){

					var oDl=document.createElement('dl');
				var oDt=document.createElement('dt');

				var oStrong=document.createElement('strong');
				oDt.appendChild(oStrong);
				oStrong.innerHTML=data.username;
				var oDd1=document.createElement('dd');
				oDd1.innerHTML=data.content;
				var oDd2=document.createElement('dd');
				oDd2.className='t';
				var oA=document.createElement('a');
				oA.href='';
				oA.innerHTML='顶(<span>'+data.support+'</span>)';
				var oA2=document.createElement('a');
				oA2.href='';
				oA2.innerHTML='踩(<span>0</span>)';
				oDd2.appendChild(oA);
				oDd2.appendChild(oA2);
				oDl.appendChild(oDt);
				oDl.appendChild(oDd1);
				oDl.appendChild(oDd2);
				if (insert&&oDl.children[0]) {
				oList.insertBefore(oDl,oList.children[0]);}
				else{
					oList.appendChild(oDl);
				}
				}
}