/*Generamos una instancia de Socket.io, ahora desde el lado del cliente*/

const socket = io(); 

socket.on("productos", (data)=>{
    renderProductos(data)
});

const renderProductos = (productos) => {
    const contenedorProds = document.getElementById("contenedorProductosRealTime")
    contenedorProds.innerHTML = ""
    productos.forEach(prod => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML= `
            <p> ${prod.title} </p>
            <p> ${prod.description} </p>
            <p> $${prod.price} </p>
            <button> Eliminar </button>
        `
        contenedorProds.appendChild(card)  
        card.querySelector("button").addEventListener("click",()=>{
            eliminarProducto(prod.id)
        })
    });
}

const eliminarProducto =(id)=>{
    socket.emit("eliminarProducto",id)
}

document.getElementById("btnEnviar").addEventListener("click", ()=>{
    agregarProductos()
})

const agregarProductos =(id)=>{
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
    }
    socket.emit("agregarProducto",producto)
}
