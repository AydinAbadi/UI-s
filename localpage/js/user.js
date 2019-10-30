//var Chart = require('chart.js');
// Define a service provider, i.e. connect to the blockchain via web3

var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("web3.currentProvider");
}
else {
    console.log("http://localhost:8545"); // was http://localhost:8545
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Check if Metamask has been Enjected
if (window.web3.currentProvider.isMetaMask) {
    ethereum.enable();
    console.log("MetaMask has been injected");
}
else {
    console.log("MetaMask has not been injected");
}

//------------

// The contract's ABI
var abi =[
    {
        "constant": false,
        "inputs": [
            {
                "name": "new_admin",
                "type": "address"
            }
        ],
        "name": "add_admin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "com_val_",
                "type": "bytes"
            },
            {
                "name": "verifiers",
                "type": "address[]"
            }
        ],
        "name": "insert_age",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "degree_",
                "type": "bytes"
            },
            {
                "name": "description_",
                "type": "bytes"
            },
            {
                "name": "verifiers",
                "type": "address[]"
            }
        ],
        "name": "insert_degree",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "license_",
                "type": "bytes"
            },
            {
                "name": "description",
                "type": "bytes"
            },
            {
                "name": "expiry_date",
                "type": "bytes"
            },
            {
                "name": "verifiers",
                "type": "address[]"
            }
        ],
        "name": "insert_license",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "pay_age_validator",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "val",
                "type": "bytes"
            }
        ],
        "name": "prove_attributes_ownership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            }
        ],
        "name": "register_client",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "register_validator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "res",
                "type": "bytes32"
            }
        ],
        "name": "validate_age",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "res",
                "type": "bytes32"
            },
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "validate_degree",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "res",
                "type": "bytes32"
            },
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "validate_license",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "verifier",
                "type": "address"
            },
            {
                "name": "r",
                "type": "bytes"
            },
            {
                "name": "m",
                "type": "string"
            }
        ],
        "name": "verify_age_commitment",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_age_howmany_getsPaid",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            }
        ],
        "name": "get_client_age_num_of_preferred_verifiers",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_age_preferred_verifier",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            }
        ],
        "name": "get_client_age_total_number_of_verifications",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            }
        ],
        "name": "get_client_age_val",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_age_verification_res",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            },
            {
                "name": "counter",
                "type": "uint256"
            }
        ],
        "name": "get_client_age_whoElse_getsPaid",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_degree_description",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_degree_num_of_preferred_verifiers",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_degree_number_of_verifications",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "degree_indx",
                "type": "uint256"
            },
            {
                "name": "verifier_indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_degree_preferred_verifier",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_degree_type",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "degree_indx",
                "type": "uint256"
            },
            {
                "name": "verifier_indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_degree_verification_res",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_description",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_expiryDate",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_num_of_preferred_verifiers",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_number_of_verifications",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "degree_indx",
                "type": "uint256"
            },
            {
                "name": "verifier_indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_preferred_verifier",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_type",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "client",
                "type": "address"
            },
            {
                "name": "license_indx",
                "type": "uint256"
            },
            {
                "name": "verifier_indx",
                "type": "uint256"
            }
        ],
        "name": "get_client_license_verification_res",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "initial_verification_cost",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "ratio",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "valid_clients",
        "outputs": [
            {
                "name": "total_number_of_degrees",
                "type": "uint256"
            },
            {
                "name": "total_number_of_licenses",
                "type": "uint256"
            },
            {
                "name": "valid",
                "type": "bool"
            },
            {
                "name": "proof_of_attributes_ownership",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "valid_organizations",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "valid_validators",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "validator_with_inconsistent_res",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
var ins = web3.eth.contract(abi);
// 0x3cb229172d346826e7bd1b725a148e91e287a3a3
var myContract = ins.at("0xd5b4b7de152fbd7e3973ebdaddc044c533a1bf81");// keyaddress
const status_txt = {
    "NA": "Your account is not registered with the Value Creation and " +
        "Trading scheme. If you are a client, or think you should be an " +
        "admin, please email your Ethereum address to" +
        " <a href='mailto:VoluntaryWork.help@inf.ed.ac.uk'>VoluntaryWork.help@inf.ed.ac.uk</a>.</p>",
    "CL": "Your status is: CLIENT",
    "AD": "Your status is ADMIN",
    "OW": "Your status is OWNER",
    "VD": "Your status is VALIDATOR"
}

var user = {
    "account": web3.eth.coinbase,
    "account_ch": false,
    "status": "XX",
    "status_ch": false,
    "balance": null,
    "balance_ch": false,
    "totaltr": null,
    "totaltr_ch": false,
    "rep": null,
    "rep_ch": false,
    "trans_hist": [],
    "offer_list": [],
    "offer_count": 0,
    "sender_fbk_ch": [],
    "receiver_fbk_ch": [],
    "lec_no": 0,
    "lec_value": 0
}
// window.onload= function(){
//     alert(user.account);
// }
var account = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
        // updateInterface();
    }
}, 100);
var globalseed;
// function generate_seed(){
//     var array = new Uint32Array(2);
//     window.crypto.getRandomValues(array);
//     var arr1 = array[0].toString(16);
//     var arr2 = array[1].toString(16);
//     // alert("arr1:"+arr1);
//     // alert("arr2:"+arr2);
//     var seed = arr1.concat(arr2);
//     document.getElementById("seedcontent").innerHTML = seed;
//     globalseed = seed;
// }
function inserSd(){
    globalseed = document.getElementById("insertseedcont").value;
    alert(globalseed);
}
function hashAge() {
    if(globalseed){
        var age = document.getElementById("age").value;
        // change age to hex
        var conbage = globalseed.concat(age.toString(16));
        // alert(conbage);
        // hash value of age
        var hashage = (Web3.prototype.sha3(conbage.concat(age.toString(16))));
        // alert(hashage);
        document.getElementById("encryptedage").innerHTML = hashage;
    }else{
        alert("You need to insert or generate a seed first!")
    }

}
function hashDegree() {
    if(globalseed){
        var degree = document.getElementById("degree").value;
        // change age to hex
        var conbdeg = globalseed.concat(degree.toString(16));
        //hash value of degree
        var hashdegree = (Web3.prototype.sha3(conbdeg));
        // alert(hashage);
        document.getElementById("encrypteddegreety").innerHTML = hashdegree;
    }else{
        alert("You need to insert or generate a seed first!")
    }

}
function hashDegreeDes(){
    if(globalseed){
        var degreedes = document.getElementById("degreedes").value;
        // change age to hex
        var conbdegdes = globalseed.concat(degreedes.toString(16));
        //hash value of degree
        var hashdegreedes = (Web3.prototype.sha3(conbdegdes));
        // alert(hashage);
        document.getElementById("encrypteddegreedes").innerHTML = hashdegreedes  ;
    }else{
        alert("You need to insert or generate a seed first!")
    }
}
function hashLicense() {
    if(globalseed){
        var license = document.getElementById("license").value;
        // change age to hex
        var conblis = globalseed.concat(license.toString(16));
        //hash value of degree
        var hashlis = (Web3.prototype.sha3(conblis));
        // alert(hashage);
        document.getElementById("encryptedlicensety").innerHTML = hashlis;
    }else{
        alert("You need to insert or generate a seed first!")
    }

}
function hashLicenseDes(){
    if(globalseed){
        var licensedes = document.getElementById("licensedes").value;
        // change age to hex
        var conblisdes = globalseed.concat(licensedes.toString(16));
        //hash value of degree
        var hashlisdes = (Web3.prototype.sha3(conblisdes));
        // alert(hashage);
        document.getElementById("encryptedLicensedes").innerHTML = hashlisdes;
    }else{
        alert("You need to insert or generate a seed first!")
    }
}
function hashExpDate() {
    if(globalseed){
        var date = document.getElementById("date").value;
        alert(date);
        // change age to hex
        var conbdate = globalseed.concat(date.toString(16));
        //hash value of degree
        var hashdate = (Web3.prototype.sha3(conbdate));
        // alert(hashage);
        document.getElementById("encryptedExpDate").innerHTML = hashdate;
    }else{
        alert("You need to insert or generate a seed first!")
    }
}


