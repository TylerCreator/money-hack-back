pragma solidity ^0.4.16;

contract owned {
    address public owner;

    function owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}

contract HourlyPayment is owned {
    struct Employee {
        uint256 keyIndex;
        uint256 timeStart; 
        uint256 unpaidTime; 
        uint256 price; 
    }
    struct KeyFlag {
        address key;
        bool deleted;
    }
    KeyFlag[] public keys;
    uint public size;

    mapping (address => Employee) public exe;

    function addExecutor(address _employee,uint256 price) public onlyOwner {
        uint keyIndex = exe[_employee].keyIndex;
        if (!(keyIndex > 0)) {
            keyIndex = keys.length++;
            exe[_employee].keyIndex = keyIndex + 1;
            keys[keyIndex].key = _employee;
            size++;
            
        }
        exe[_employee].timeStart = 0;
        exe[_employee].unpaidTime = 0;
        exe[_employee].price = price;
    }
    
    function remove(address _employee) public onlyOwner returns (bool success) {
        uint keyIndex = exe[_employee].keyIndex;
        if (keyIndex == 0) return false;
        exe[_employee].keyIndex = 0;
        keys[keyIndex - 1].deleted = true;
        size --;
    }
    
    function getEmployeesCount() public onlyOwner returns (uint count) {
        return size;
    }
    
    function setTimeStart ( uint256 TS ) public {
        exe[msg.sender].timeStart = TS;
    }
  
    function setTimeTo(uint256 TS )  public {
        uint256 time = TS - exe[msg.sender].timeStart;
        exe[msg.sender].unpaidTime += time;
    }
    
    function getTime(address _employee) public returns (uint256) {
        return exe[_employee].unpaidTime;
    }
    
    function getPrice(address _employee) public returns (uint256) {
        return exe[_employee].price;
    }
  
    function approveTime(address _employee,uint256 timePaid) public onlyOwner payable{
       _employee.transfer(msg.value);
       exe[_employee].unpaidTime -= timePaid;
    }
    
}