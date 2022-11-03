async function addProductToCart(cartId, productId) {
    const product = { quantity: 1, product: productId }
    const res = await fetch(`/api/carts/${cartId}/products`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status != 200) {
        alert('error al agregar producto al carrito')
    } else {
        alert('OK')
    }
}


async function deleteProductFromCart(cartId, productId) {
    const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status != 200) {
        alert('error al elmininar producto al carrito')
    } else {
        alert('OK')
    }
}

async function finishPurchase(cartId, userId) {
    const finished = { cart: cartId, user: userId }
    const res = await fetch(`/api/carts/${cartId}/finish`, {
        method: 'POST',
        body: JSON.stringify(finished),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status != 200) {
        alert('error al finalizar')
    } else {
        alert('OK')
        window.location.href = `/`
    }
}