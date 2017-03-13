		function startMove(obj,json,endFn){

		clearInterval(obj.timer);

		var iSpeed=0

		obj.timer=setInterval(function(){

			var iCur=0;
			var onOff=true;
			for(var attr in json){

			var iTarget=json[attr];
		
		if (attr=='opacity') {
			iCur=css(obj,'opacity')*100;}
			else{
				iCur=parseInt(css(obj,attr));
			}
			
			iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur!=iTarget) {
				onOff=false;
				iCur=iCur+iSpeed;	
			};




			if (attr=='opacity') {
				obj.style.opacity=iCur/100;
				obj.style.filter='alpha(opacity='+iCur+')';
			}else{

			obj.style[attr]=iCur+'px';
			
			}
		}
		if (onOff) {
			clearInterval(obj.timer);
		};

		},30)
	}
		function css(obj,attr){
		return obj.getCurrentStyle ? obj.getCurrentStyle[attr] : getComputedStyle(obj)[attr];
	}
