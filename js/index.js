// const variable
// thiết lập duy trì đăng nhập trên các trang
// const gl_loginTrue = confirmSignIn();

// const { json } = require("express");

// user
var gl_countData;
const gl_user_index = null;

// HÀM XỬ LÝ CSS

// const display = document.querySelector("#addnew");
// let direct = "";
// display.addEventListener("click", displayData(direct));

// click all checkbox table

function clickAllCkb(){
    let checkboxes = document.getElementsByName('ckb');

        if(document.querySelector("#ckb_head").checked == true)
        {
            // Lặp và thiết lập checked
            for (let i = 0; i < checkboxes.length; i++){
                checkboxes[i].checked = true;
            }
        }
        else
        {
            // Lặp và thiết lập checked
            for (let i = 0; i < checkboxes.length; i++){
                checkboxes[i].checked = false;
            }
        }
}

// close detail product form
function displayDetailProduct(){
    let checkDisplay = document.getElementById("detailProduct").style.display;

    if(checkDisplay == ''){
        document.getElementById("detailProduct").style.display = "block";
    }
    if(checkDisplay == "block"){
        document.getElementById("detailProduct").style.display = "";
    }
}

// save detail product
function SaveDetailProduct(){
    // save data
    const directoryFile = "data/data1.json";
    SaveProduct(directoryFile);

    // display data on table
    // displayData(directoryFile);

    //close dialog form
    displayDetailProduct();
}

// change type display
function changeDisplay(){
    let nuclear = document.getElementById("nuclear").style.marginLeft;

    if(nuclear==""){
        document.getElementById("nuclear").style.marginLeft = "50px";
        document.getElementById("style-grid").style.display = "none";
        document.getElementById("style-detail").style.display = "block";
    }
    else{
        document.getElementById("nuclear").style.marginLeft = "";
        document.getElementById("style-grid").style.display = "flex";
        document.getElementById("style-detail").style.display = "none";
    }
}

// change style
function changeStyle(){

}

// checked create bill
function changeCreateBillDate(){
    let ipDate = document.getElementById("inputdate").checked;

    if(ipDate == true){
        document.getElementById("inputdate").checked = true;
        document.getElementById("inputmonth").checked = false;
        document.getElementById("inputyear").checked = false;
        console.log("true");
    }
}

function changeCreateBillMonth(){
    let ipMonth = document.getElementById("inputmonth").checked;

    if(ipMonth == true){
        document.getElementById("inputmonth").checked = true;
        document.getElementById("inputdate").checked = false;
        document.getElementById("inputyear").checked = false;
        console.log("true");
    }
}

function changeCreateBillYear(){
    let ipYear = document.getElementById("inputyear").checked;

    if(ipYear == true){
        document.getElementById("inputyear").checked = true;
        document.getElementById("inputdate").checked = false;
        document.getElementById("inputmonth").checked = false;
        console.log("true");
    }
}

// multi choice with shift key
function multiChoice_Shift(){
    let indexStart;
}

// chuyển đổi signIn - signUp
function changeSS(){
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".containerLogin");

    sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    });

}

// xác nhận đăng nhập, đăng ký thành công
function confirmSignIn(){
    if(SignInAccount()){
        // lấy ra thông tin tài khoản
        let directotry = "data/account.json";
        const currentAccount = ReadJsonData(directotry);

        // chuyển đổi avatar và username sau đăng nhập
        document.getElementById("login-avatar").innerHTML = currentAccount[gl_user_index].username.split(' ').forEach(item => item.substr(0,1));
        document.getElementById("login-user").innerHTML = currentAccount[gl_user_index].username;

        // chuyển về trang chủ
        location.href = "../../index.html";
        return "success";
    }
    else{
        // thông báo lỗi đăng nhập
        alert("Đăng Nhập Không Thành Công");
    }
    // location.href = "../../index.html";
}

function confirmSignUp(){
    // if(createNewAccount()){
    //     // lấy ra thông tin tài khoản

    //     // chuyển về trang chủ
    //     location.href = "../../index.html";
    // }
    // else{
    //     // thông báo lỗi đăng ký
    //     alert("Đăng Ký Không Thành Công");
    // }

    location.href = "../../index.html";
}



// HÀM XỬ LÝ DỮ LIỆU

// lấy dữ liệu từ client            <status: OK>
function GetDataFromClient(){
    let proName = document.getElementById("inputProductName").value;
    let proCost = document.getElementById("inputProductCost").value;
    let time = document.getElementById("inputTime");
    let proTime = time.options[time.selectedIndex].text;
    let proDate = document.getElementById("inputDate").value;
    let placeBuy = document.getElementById("inputPlaceBuy").value;
    let note = document.getElementById("inputNote").value;

    // lấy danh sách dữ liệu đã có trong file json
    // const currentData = [NReadJsonData(direct)];

    let dateObject = new Date(proDate);
    
    const record = {"monthProduct":{"month": dateObject.getMonth()+1, "year": dateObject.getFullYear()}, "product": 
    {'code': 'P'+dateObject.toLocaleDateString('en-US', {month: 'short'}).substr(0,1)+dateObject.getFullYear().toString()+(gl_countData+1).toString(),
    'name': proName, 'cost': proCost, 'time': proTime, 'date': proDate, 'place': placeBuy, 'note': note}};
    // console.log("record: ",record);
    // console.log("record type of: ", typeof(record));
    // console.log("json record: ", JSON.stringify(record));

    return record;
}

// set value input default          <status: OK>
function CancelInputData(){
    document.getElementById("inputProductName").value = "";
    document.getElementById("inputProductCost").value = "";
    let time = document.getElementById("inputTime");
    time.options[time.selectedIndex='0'].text;
    document.getElementById("inputDate").value = "";
    document.getElementById("inputPlaceBuy").value = "";
    document.getElementById("inputNote").value = "";
}

// đọc dữ liệu có sẵn               <status: issued -> lỗi mã hóa>
function ReadJsonData(direct){
    const githubUsername = 'IL-vin9220';
    const githubRepo = 'DailySpending_Web';
    const filePath = direct;
    const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

    // URL của file JSON trên GitHub
    const jsonFileUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    // Headers cho Fetch API
    const headers = {
        'Authorization': `token ${accessToken}`
    };

    // Sử dụng Fetch API để tải xuống nội dung của file JSON
    fetch(jsonFileUrl, { headers })
        .then(response => response.json())
        .then(data => {
            // Giải mã nội dung base64 thành chuỗi JSON
            const decodedContent = atob(data.content);
            // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
            let jsonData = JSON.parse(decodedContent);
            return jsonData;
            // Xử lý dữ liệu JSON ở đây
            console.log("json data: ", jsonData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });


}

function NReadJsonData(direct){
    const githubUsername = 'IL-vin9220';
    const githubRepo = 'DailySpending_Web';
    const filePath = direct;
    const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

    // URL của file JSON trên GitHub
    const jsonFileUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    // Headers cho Fetch API
    const headers = {
        'Authorization': `token ${accessToken}`
    };

    // Sử dụng Fetch API để tải xuống nội dung của file JSON
    fetch(jsonFileUrl, { headers })
        .then(response => response.json())
        .then(data => {
            // Giải mã nội dung base64 thành chuỗi JSON
            const decodedContent = customAtob(data.content);
            // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
            // let jsonData = JSON.parse(decodedContent);
            return decodedContent;
            // Xử lý dữ liệu JSON ở đây
            console.log("json data: ", jsonData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// mã hóa dữ liệu trước khi gửi     <status: OK>
function customBtoa(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// giải mã dữ liệu                  <status: OK>
function customAtob(str) {
    // Giải mã chuỗi base64 bằng hàm atob()
    let decoded = atob(str);
    // Giải mã chuỗi UTF-8
    decoded = decodeURIComponent(escape(decoded));
    return decoded;
}

// thêm 1 bản ghi dữ liệu           <status: OK>
function addNewData(direct){
    const githubUsername = 'IL-vin9220';
    const githubRepo = 'DailySpending_Web';
    const filePath = direct;
    const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

    // Tạo URL API để lấy nội dung tệp JSON
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    // Tạo cấu hình cho fetch request để lấy nội dung tệp JSON hiện tại
    const config = {
        method: 'GET',
        headers: {
            'Authorization': `token ${accessToken}`
        }
    };

    // Gửi yêu cầu GET để lấy nội dung tệp JSON hiện tại
    fetch(apiUrl, config)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }
            return response.json();
        })
        .then(data => {
            // Lấy nội dung tệp JSON hiện tại từ phản hồi và giải mã base64
            const currentData = JSON.parse(customAtob(data.content));
            // console.log(currentData);
        
            // Thêm bản ghi mới vào dữ liệu
            const newRecord = GetDataFromClient(direct);
            currentData.push(newRecord);
        
            // Chuyển đổi dữ liệu thành chuỗi và mã hóa thành base64
            const newContent = JSON.stringify(currentData);
            const content = customBtoa(newContent); 
        
            // Tạo body cho yêu cầu PUT để cập nhật tệp JSON
            const body = {
                "message": "Update file",
                "content": content,
                "sha": data.sha,
                "branch": "main"
            };
        
            // Cấu hình cho fetch request để gửi yêu cầu PUT
            const putConfig = {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
        
            // Gửi yêu cầu PUT để cập nhật tệp JSON
            fetch(apiUrl, putConfig)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update file');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('File updated successfully:', data);
                })
                .catch(error => {
                    console.error('Error updating file:', error);
                });
        })
        
        .catch(error => {
            console.error('Error fetching file:', error);
        });

}

// Hiển thị thông tin danh sách dữ liệu
function displayData(direct){
    // lấy thông tin danh sách dữ liệu đã có
    let currentData = NReadJsonData(direct);
    currentData = JSON.parse(currentData);

    // thêm vào bảng dữ liệu
    for(let i=0; i<currentData.length; i++){
        let parentNode = document.getElementById("wrap-body");

        // tạo thẻ con level 1: tb-body
        const tbBody = document.createElement("div");
        tbBody.className = "tb-body";

        // tạo các thẻ con level 2
        const wrapFirst = document.createElement("div");
        wrapFirst.className = "warp-first";
        wrapFirst.style.display = "flex";

        const prCode = document.createElement("span");
        prCode.className = "productCode";
        prCode.textContent = currentData[i].code;

        const prName = document.createElement("span");
        prName.className = "productName";
        prName.textContent = currentData[i].name;

        const prCost = document.createElement("span");
        prCost.className = "productCost";
        prCost.textContent = currentData[i].cost;

        const prTime = document.createElement("span");
        prTime.className = "productTime";
        prTime.textContent = currentData[i].time;

        const prDate = document.createElement("span");
        prDate.className = "productDate";
        prDate.textContent = currentData[i].date;

        const moreOptionTable = document.createElement("span");
        moreOptionTable.className = "icon more-option";
        moreOptionTable.title = "Chi Tiết";
        moreOptionTable.setAttribute("onclick", "displayDetailProduct()");

        // tạo các thẻ con level 3
        const inp_ckbox = document.createElement("input");
        inp_ckbox.className = "ckb";
        inp_ckbox.id = "ckb_head";
        inp_ckbox.name = "ckb";
        inp_ckbox.type = "checkbox";

        const contentSTT = document.createElement("span");
        contentSTT.className = "stt";
        contentSTT.textContent = i.toString();
        contentSTT.style.marginLeft = "10px";

        const fi_icon = document.createElement("i");
        fi_icon.className = "fi fi-rs-circle-ellipsis";

        // nối node
        wrapFirst.appendChild(inp_ckbox);
        wrapFirst.appendChild(contentSTT);

        moreOptionTable.appendChild(fi_icon);

        tbBody.appendChild(wrapFirst);
        tbBody.appendChild(prCode);
        tbBody.appendChild(prName);
        tbBody.appendChild(prCost);
        tbBody.appendChild(prTime);
        tbBody.appendChild(prDate);
        tbBody.appendChild(moreOptionTable);

        parentNode.appendChild(tbBody);

        document.getElementById("count-total").innerHTML = document.getElementById("wrap-body").childElementCount;

    }
}

// Function to handle saving data
async function SaveProduct(direct) {
    const githubUsername = 'IL-vin9220';
    const githubRepo = 'DailySpending_Web';
    const filePath = direct;
    const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

    try {
        const response = await fetch(`https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`, {
            method: 'GET',
            headers: {
                Authorization: `token ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const content = JSON.parse(customAtob(data.content));
            gl_countData = content.length;
            let newData = GetDataFromClient();
            content.push(newData);

            const updateResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Add new data',
                    content: customBtoa(JSON.stringify(content)),
                    sha: data.sha
                })
            });

            if (updateResponse.ok) {
                // Update table
                updateTable(content);
                console.log('Data saved successfully!');
            } else {
                console.error('Failed to update data on GitHub.');
            }
        } else {
            console.error('Failed to fetch data from GitHub.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


// Function to update table
function updateTable(data) {
    const tbody = document.getElementById('wrap-body');
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'tb-body';

        row.innerHTML = `
        <div class="wrap-first">
            <input type="checkbox" name="ckb" id="ckb_head" class="ckb">
            <span class="stt">${index + 1}</span>
        </div>
        <span class="productCode">${item.product.code}</span>
        <span class="productName">${item.product.name}</span>
        <span class="productCost">${item.product.cost}</span>
        <span class="productTime">${item.product.time}</span>
        <span class="productDate">${item.product.date}</span>
        <span class="icon more-option" title="Chi Tiết" onclick="displayDetailProduct()"><i class="fi fi-rs-circle-ellipsis"></i></span>
        `;

        tbody.appendChild(row);
    });
}

// delete record
function removeRecord(data){
    const tbody = document.getElementById('wrap-body');
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'tb-body';

        row.innerHTML = `
            <div class="wrap-first">
                <input type="checkbox" name="ckb" id="ckb_head" class="ckb">
                <span class="stt">${index + 1}</span>
            </div>
            <span class="productCode">${item.productName}</span>
            <span class="productName">${item.productCost}</span>
            <span class="productCost">${item.proTime}</span>
            <span class="productTime">${item.productDate}</span>
            <span class="productDate">${item.placeBuy}</span>
            <button onclick="deleteProduct(${index})">Xóa</button> // Thêm nút Xóa và sự kiện onclick
        `;

        tbody.appendChild(row);
    });
}

// get sha (Secure Hash Algorithm)
function getSHAFile(fileP){
    const githubUsername = 'IL-vin9220';
    const githubRepo = 'DailySpending_Web';
    const filePath = fileP;
    const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

    const jsonFileUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    // Cấu hình Fetch API để gửi yêu cầu GET
    const config = {
    headers: {
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json'
    }
    };

    // Gửi yêu cầu GET để lấy thông tin về tệp JSON trên GitHub
    fetch(jsonFileUrl, config)
    .then(response => response.json())
    .then(data => {
        const sha = data.sha;
        console.log('SHA of the file:', sha);
        return sha;
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });

}

// kiểm tra file có tồn tại
function checkExistFile(direct){
    const githubUsername = 'IL-vin9220';
    const githubRepo = 'DailySpending_Web';
    const filePath = direct;
    const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

    // Tạo URL API để lấy thông tin về tệp JSON
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    // Cấu hình cho yêu cầu GET
    const config = {
        method: 'GET',
        headers: {
            'Authorization': `token ${accessToken}`
        }
    };

    // Gửi yêu cầu GET để lấy thông tin về tệp JSON
    fetch(apiUrl, config)
        .then(response => {
            if (response.status === 200) {
                console.log('File exists.');
                return true;
            } else if (response.status === 404) {
                console.log('File does not exist.');
                return false;
            } else {
                throw new Error('Failed to check file existence.');
            }
        })
        .catch(error => {
            console.error('Error checking file existence:', error);
        });

}

// tạo file mới nếu chưa tồn tại
function createAFile(direct){
    if(!checkExistFile){
        const githubUsername = 'IL-vin9220';
        const githubRepo = 'DailySpending_Web';
        const filePath = direct;
        const accessToken = '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'; // Cần token quyền truy cập để sửa đổi

        // Tạo URL API để tạo nội dung tệp JSON
        const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

        // Dữ liệu JSON bạn muốn tạo
        const data = {
            "name": "John",
            "age": 30
        };

        // Chuyển đổi dữ liệu thành chuỗi JSON
        const jsonData = JSON.stringify(data);

        // Tạo body cho yêu cầu POST để tạo tệp JSON
        const body = {
            "message": "Create new file",
            "content": customBtoa(jsonData), // Mã hóa nội dung JSON sang base64
            "branch": "main" // Tên branch mà tệp JSON sẽ được lưu trữ
        };

        // Cấu hình cho yêu cầu POST
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `token ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        // Gửi yêu cầu POST để tạo tệp JSON
        fetch(apiUrl, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create file');
                }
                return response.json();
            })
            .then(data => {
                console.log('File created successfully:', data);
            })
            .catch(error => {
                console.error('Error creating file:', error);
            });

    }
}

// đăng ký tài khoản mới
function createNewAccount(){
    let email = document.getElementById("inputEmail_SignUp");
    let user = document.getElementById("inputUser_SignUp");
    let pass = document.getElementById("inputPass_SignUp");
    let cfPass = document.getElementById("inputCfPass_SignUp");

    // lấy ra danh sách các tài khoản người dùng đã có
    let path = "data/account.json";
    const getNumberAccount = ReadJsonData(path);
    const index=0;
    if(getNumberAccount.length>=1){index=getNumberAccount.length+1;}

    if(pass == cfPass){
        const record = {"email":email, "username":user, "password":pass, "index":index};
        // lưu tài khoản mới

        // lấy ra thông tin tài khoản mới

        // xác nhận đăng ký thành công
        return true;

    }
    else{alert("Mật Khẩu Không Trùng Khớp!");}
    return false;
}

// kiểm tra đăng nhập
function SignInAccount(){
    let user = document.getElementById("inputUser").value;
    let pass = document.getElementById("inputPass").value;

    let directotry = "data/account.json";
    const currentAccount = ReadJsonData(directotry);
    for(let i=0; i<currentAccount.length; i++){
        if(currentAccount[i].username==user && currentAccount[i].password==pass){gl_user_index = i; return true;}
    }
    return false;
}