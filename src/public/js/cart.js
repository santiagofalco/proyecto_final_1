async function addProductToCart(cartId, productId) {
    let quantity = parseInt(document.getElementById('quantity-'+productId).value)
    if (quantity <= 0) {
        alert('la cantidad debe ser mayor a 0')
        return
    }
    const product = { quantity, product: productId }
    const res = await fetch(`/api/carts/${cartId}/products`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status != 200) {
        alert('failed adding product to cart')
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
        alert('failed to delete product form cart')
    } else {
        location.reload()
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
        alert('failed to finish purchase')
    } else {
        alert('OK')
        window.location.href = `/`
    }
}