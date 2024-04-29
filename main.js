	let title =document.querySelector('#title');
	let price=document.querySelector('#price');
	let taxes =document.querySelector('#taxes');
	let ads =document.querySelector('#ads');
	let discount =document.querySelector('#discount');
	let total =document.querySelector('#total');
	let count =document.querySelector('#count');
	let category =document.querySelector('#category');
	let submit =document.querySelector('#submit');
	let tbody =document.querySelector('tbody');

	let mood ='create';

	let temp;

	// get total
	function getTotal(){
		if(price.value !=''){
			let result =(+price.value+ +taxes.value + +ads.value)
			- +discount.value;
			total.innerHTML=result;
			total.style.background='green';
		}
		else{
			total.style.background='#a00d02';
			total.innerHTML='';
		}
	}


	// create product 
	let dataPro;
	if(localStorage.product !=null){
		dataPro=JSON.parse(localStorage.product);
	}else{
		dataPro=[];
	}



	submit.onclick= function(){
		let newPro={
			title:title.value.toLowerCase(),
			price:price.value,
			taxes:taxes.value,
			ads:ads.value,
			discount:discount.value,
			total:total.innerHTML,
			count:count.value,
			category:category.value.toLowerCase()
		}
		// count 
		if(title.value !=''&& price.value!=''&& category.value!=''&& newPro.count<100)
		{
			if(mood==='create')
		{
		if(newPro.count>1){
			for(let i =0 ;i<newPro.count;i++){
				dataPro.push(newPro);
			}
		}else{
			dataPro.push(newPro);
		}
		}else{
			dataPro[temp]=newPro;
			mood='create';
			submit.innerHTML='Create';
			count.style.display='block';

		}
		clearData();
		}


		// save localstorage
		localStorage.setItem('product', JSON.stringify(dataPro));
		
		showData();
	}







	// clear inputs 
	 function clearData(){
	 	title.value='';
	 	price.value='';
	 	taxes.value='';
	 	ads.value='';
	 	discount.value='';
	 	count.value='';
	 	total.innerHTML='';
	 	category.value='';
	   }



	// read 

	function showData(){
		let table='';
		getTotal();
		for(let i=0;i<dataPro.length;i++){
			table +=`
		<tr>
		<td>${i+1}</td>
		<td>${dataPro[i].title}</td>
		<td>${dataPro[i].price}</td>
		<td>${dataPro[i].taxes}</td>
		<td>${dataPro[i].ads}</td>
		<td>${dataPro[i].discount}</td>
		<td>${dataPro[i].total}</td>
		<td>${dataPro[i].category}</td>
		<td><button onclick="updateData(${i})" id="update">update</button></td>
		<td><button onclick="deleteData(${i})" id="de">delete</button></td>
		</tr> 
								`;
			
		}
		tbody.innerHTML=table;
		let btnDelete=document.querySelector('#deleteAll');
		if(dataPro.length >0){
			btnDelete.innerHTML=`
			<button onclick="deleteAll()">delete All(${dataPro.length})</button>
			`;
		}
		else{
			btnDelete.innerHTML='';
		}
	}
	showData();


	// delete 

	function deleteData(i){
		dataPro.splice(i,1);
		localStorage.product=JSON.stringify(dataPro);
		showData();
	}

	function deleteAll(){
		localStorage.clear();
		dataPro.splice(0);
		showData();
	}





	// update 

	function updateData(i){
		title.value=dataPro[i].title;
		price.value=dataPro[i].price;
		taxes.value=dataPro[i].taxes;
		ads.value=dataPro[i].ads;
		discount.value=dataPro[i].discount;
		category.value=dataPro[i].title;
		getTotal();
		count.style.display='none';
		submit.innerHTML='Update';
		mood='update';
		temp=i;
		scroll({
			top:0,
			behavior:'smooth'
		});
	}





	// search 
	let searchMood='title';
	 
	function getSearchMood(id) {
		let search=document.querySelector('#search');
		search.focus();
		if(id=='searchTitle'){
			searchMood='title';
		
		}else{
			searchMood='category';
			
		} 
		search.value='';
		search.placeholder='Search By '+searchMood;
		showData();

	}


	function searchData(value){
		let table;
		for(let i=0;i<dataPro.length;i++){
		if(searchMood=='title'){
		
				if(dataPro[i].title.includes(value.toLowerCase())){
					table +=`
		<tr>
		<td>${i}</td>
		<td>${dataPro[i].title}</td>
		<td>${dataPro[i].price}</td>
		<td>${dataPro[i].taxes}</td>
		<td>${dataPro[i].ads}</td>
		<td>${dataPro[i].discount}</td>
		<td>${dataPro[i].total}</td>
		<td>${dataPro[i].category}</td>
		<td><button onclick="updateData(${i})" id="update">update</button></td>
		<td><button onclick="deleteData(${i})" id="de">delete</button></td>
		</tr> 
								`;
				}
		
		



		}







		else{
					
				if(dataPro[i].category.includes(value.toLowerCase())){
					table +=`
		<tr>
		<td>${i}</td>
		<td>${dataPro[i].title}</td>
		<td>${dataPro[i].price}</td>
		<td>${dataPro[i].taxes}</td>
		<td>${dataPro[i].ads}</td>
		<td>${dataPro[i].discount}</td>
		<td>${dataPro[i].total}</td>
		<td>${dataPro[i].category}</td>
		<td><button onclick="updateData(${i})" id="update">update</button></td>
		<td><button onclick="deleteData(${i})" id="de">delete</button></td>
		</tr> 
								`;
				}
			
		
		}}
	tbody.innerHTML=table;

	}



	// clean data 


