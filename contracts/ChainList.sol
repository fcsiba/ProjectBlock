pragma solidity ^0.5.0;

import "./Ownable.sol";

contract ChainList is Ownable {
  
  struct Project {
    uint id;
    address payable seller;
    address payable buyer;
    string name;
    string description;
    uint256 price;    
  }

  // state variable
  mapping (uint => Project) public projects;
  uint projectCounter;

  
  event LogSellProject(
    uint indexed _id,
    address indexed _seller,
    string _name,
    uint256 _price
  );
  event LogBuyProject(
    uint indexed _id,
    address indexed _seller,
    address indexed _buyer,
    string _name,
    uint256 _price
  );

  
  function kill() public onlyOwner {
    selfdestruct(msg.sender);
  }

  
  function sellProject(string memory _name, string memory _description, uint256 _price) public {
    projectCounter++;

    projects[projectCounter] = Project(
      projectCounter,
      msg.sender,
      address(0x0),
      _name,
      _description,
      _price
    );

    emit LogSellProject(projectCounter, msg.sender, _name, _price);
  }

  function getNumberOfProjects() public view returns (uint) {
    return projectCounter;
  }

  function getProjectsForSale() public view returns (uint[] memory) {
    uint[] memory projectIds = new uint[](projectCounter);
    uint numberOfProjectsForSale = 0;
    for (uint i = 1; i <= projectCounter; i++) {
      if (projects[i].buyer == address(0x0)) {
        projectIds[numberOfProjectsForSale] = projects[i].id;
        numberOfProjectsForSale ++;
      }
    }

    uint[] memory forSale = new uint[](numberOfProjectsForSale);
    for (uint j = 0; j < numberOfProjectsForSale; j++) {
      forSale[j] = projectIds[j];
    }
    return forSale;
  }


  function buyProject(uint _id) payable public {
    require(projectCounter > 0);

    require(_id > 0 && _id <= projectCounter);

    Project storage project = projects[_id];

    require(project.buyer == address(0x0));

    require(msg.sender != project.seller);
    
    require(msg.value == project.price);

    project.buyer = msg.sender;

    project.seller.transfer(msg.value);

    emit LogBuyProject(_id, project.seller, project.buyer, project.name, project.price);
  }
}
