const productForm = document.getElementById('productForm')
const productFormEdit = document.getElementById('productEditForm')

productForm?.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(productForm)
    let obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status != 200) {
            alert('error al subir producto')
        } else {
            location.reload()
        }
    })
})

productFormEdit?.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(productFormEdit)
    let obj = {}
    const splittedPath = window.location.pathname.split('/')
    const productId = splittedPath[splittedPath.length-1]
    data.forEach((value, key) => obj[key] = value);
    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status != 200) {
            alert('error al subir producto')
        } else {
            window.location.href = '/'
        }
    })
})


async function deleteProductFromList(productId) {
    const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status != 200) {
        alert('error al elmininar producto al carrito')
    } else {
        location.reload()
    }
}