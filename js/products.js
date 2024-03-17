const URL = 'http://localhost:3400/produtos'

let productlist = [];
let btnAdd = document.querySelector('#btn-add1');
let producttable = document.querySelector('table>tbody');
let productmodal = new bootstrap.Modal(document.querySelector('#modal-product'));

btnAdd.addEventListener('click', () => {
    clearproductmodal();
    productmodal.show();
});

let modalForm = {
    id: document.querySelector('#id'),
    name: document.querySelector('#name'),
    stock: document.querySelector('#stock'),
    obs: document.querySelector('#obs'),
    date: document.querySelector('#date'),
    price: document.querySelector('#price'),

    btnsave: document.querySelector('#btn-save1'),
    btncancel: document.querySelector('#btn-cancel1')

}

function getproduct() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': gettoken()
        }
    })
        .then(response => response.json())
        .then(products => {
            productlist = products;
            filltable(products);
        })
        .catch((erro) => { });
}

getproduct();

function filltable(products) {
    producttable.textContent = '';
    products.forEach(product => {
        tableline(product);
    });
}

function tableline(product) {
    let tr = document.createElement('tr');

    let tdid = document.createElement('td');
    let tdname = document.createElement('td');
    let tdstock = document.createElement('td');
    let tdprice = document.createElement('td');
    let tdobs = document.createElement('td');
    let tdregister = document.createElement('td');
    let tdactions = document.createElement('td');

    tdid.textContent = product.id
    tdname.textContent = product.nome
    tdstock.textContent = product.quantidadeEstoque
    tdprice.textContent = product.valor
    tdobs.textContent = product.observacao
    tdregister.textContent = new Date(product.dataCadastro).toLocaleDateString();
    tdactions.innerHTML = `<button onclick="editproduct(${product.id})" class="btn btn-outline-light btn-sm mr-3">Edit</button>
    <button onclick="deleteproduct(${product.id})" class="btn btn-outline-light btn-sm mr-3">Delete</button>`

    tr.appendChild(tdid);
    tr.appendChild(tdname);
    tr.appendChild(tdstock);
    tr.appendChild(tdprice);
    tr.appendChild(tdobs);
    tr.appendChild(tdregister);
    tr.appendChild(tdactions);

    producttable.appendChild(tr)

}

modalForm.btnsave.addEventListener('click', () => {
    let product = getproductmodal();

    if (!product.validar()) {
        alert('Text input required.');
        return;
    }

    addproductbackend(product);

});

function getproductmodal() {
    return new Product({
        id: modalForm.id.value,
        nome: modalForm.name.value,
        quantidadeEstoque: modalForm.stock.value,
        observacao: modalForm.obs.value,
        valor: modalForm.price.value,
        dataCadastro: (modalForm.date.value)
            ? new Date(modalForm.date.value).toISOString()
            : new Date().toISOString()
    })

}

function addproductbackend(product) {
    fetch(URL, {
        method: 'POST',
        headers: {
            Authorization: gettoken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(response => {
            let newproduct = new Product(response);
            productlist.push(newproduct);

            filltable(productlist);

            productmodal.hide();

            alert(`${product.nome}, added successfully.`)


        })
}

function clearproductmodal() {
    modalForm.id.value = '';
    modalForm.name.value = '';
    modalForm.stock.value = '';
    modalForm.obs.value = '';
    modalForm.date.value = '';
    modalForm.price.value = '';
}

function deleteproduct(id) {
    let product = productlist.find(product => product.id == id);
    if (confirm("Do you really want to delete " +  product.nome)) {
        deleteproductbackend(id);
    }
}

function deleteproductbackend(id) {
    fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: gettoken()
        }
    })
        .then(() => {
            deleteproductonlist(id);
            filltable(productlist)
        })
}

function deleteproductonlist(id) {
    let indice = productlist.findIndex(product => product.id == id);
    productlist.splice(indice, 1);
}