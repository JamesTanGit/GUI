// ADD NEW ITEM TO END OF LIST
var node1 = document.createElement('li');
node1.textContent = "cream";
var unorderedlist = document.querySelector('ul');
unorderedlist.appendChild(node1);

// ADD NEW ITEM START OF LIST
var node2 = document.createElement('li');
node2.textContent = "kale";
unorderedlist.insertBefore(node2, unorderedlist.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var list = document.getElementsByTagName('li');
for (var i = 0; i < list.length; ++i) {
    list[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var number = document.createElement('span');
number.textContent = list.length.toString();
var headingTwo = document.querySelector('h2');
headingTwo.appendChild(number);