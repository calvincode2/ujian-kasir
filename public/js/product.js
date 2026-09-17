document.addEventListener("DOMContentLoaded", () => {
    // Add Product
    const createForm = document.getElementById("create-product-form")
    createForm.addEventListener("submit", submitCreateForm)
    function submitCreateForm(event){
        event.preventDefault()
        const name = document.getElementById("name").value
        const price = document.getElementById("price").value
        const description = document.getElementById("description").value
        const size = document.getElementById("size").value
        const data = {
            name: name,
            price: price,
            description: description,
            size: size,
        }
        fetch("products", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                 "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(data)
        })
        .then(async (response)=> {
            // response untuk mengirim
            const result = await response.json()
            return result
        })
        .then((result)=> {
            // response kembalian
            const alertContainer = document.getElementById("alert-container");

            alertContainer.innerHTML = `
                <div class="flex items-start sm:items-center p-4 mb-4 text-sm text-green-700 rounded-lg bg-green-400"
                    role="alert">
                    <p>
                        <span class="font-medium me-1">Success!</span>
                        ${result.message}
                    </p>
                </div>
            `;
        })
        .catch(error => {
            console.log('err', error)
        })
    }

    const modal = document.getElementById('crud-modal');
    function btnAddModal() {
        modal.classList.remove("hidden")
        modal.classList.add("flex")
    }

    function closeModal(){
        modal.classList.add("hidden")
        modal.classList.remove("flex")
    }

    function cancelModal(){
        modal.classList.add("hidden");
        modal.classList.remove("flex")
    }

    const tombol = document.getElementById("btn-add-product");
    const cancel = document.getElementById("btn-close-modal");
    const btnCancel = document.getElementById("btn-cancel-modal");

    tombol.addEventListener("click", btnAddModal)
    cancel.addEventListener("click", closeModal)
    btnCancel.addEventListener("click", cancelModal)






















    // Edit Product
    const editModal = document.getElementById('edit-modal')
    const editForm = document.getElementById("edit-form");

    let productName = editModal.querySelector("#name")
    let productPrice = editModal.querySelector("#price");
    let productDescription = editModal.querySelector("#description")
    let productSize = editModal.querySelector("#size")

    function updateProduct(event) {
        event.preventDefault();

        const id = editForm.dataset.productId;

        const data = {
            name: productName.value,
            price: productPrice.value,
            size: productSize.value,
            description: productDescription.value
        };

        fetch(`/admin/products/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            },

            body: JSON.stringify(data)
        })
        .then(async (response) => {
            const result = await response.json();
            return result;
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log("err", error);
        });
    }

    const sizes = [
        {
            value: "Small",
            text: "Small"
        },
        {
            value: "Medium",
            text: "Medium"
        },
        {
            value: "Large",
            text: "Large"
        },
        {
            value: "Extra Large",
            text: "Extra Large"
        }
    ];

    sizes.forEach((size) => {
        const option = document.createElement("option");

        option.value = size.value;
        option.textContent = size.text;

        productSize.appendChild(option);
    });

    function btnEditModal(event) {
        const data = event.currentTarget;

        productName.value = data.dataset.productName;
        productPrice.value = data.dataset.productPrice;
        productDescription.value = data.dataset.productDescription;
        productSize.value = data.dataset.productSize;

        editForm.dataset.productId = data.dataset.productId;

        editModal.classList.remove("hidden");
        editModal.classList.add("flex");
        editModal.setAttribute("aria-hidden", "false");
    }

    function closeModalEdit(){
        editModal.classList.add("hidden")
        editModal.classList.remove("flex")
    }

    function cancelModalEdit(){
        editModal.classList.add("hidden");
        editModal.classList.remove("flex")
    }

    const tombolEdit = document.querySelectorAll(".btn-edit-product")
    const cancelEdit = document.getElementById("btn-close-edit")
    const btnCancelEdit = document.getElementById("btn-cancel-edit")

    tombolEdit.forEach((button) => {
        button.addEventListener("click", btnEditModal);
    });
    cancelEdit.addEventListener("click", closeModalEdit)
    btnCancelEdit.addEventListener("click", cancelModalEdit)




















    // form delete
    const deleteForms = document.querySelectorAll(".form-delete-product")
    deleteForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            const confirmDelete = confirm("Yakin ingin menghapus produk ini?")
            if(!confirmDelete){
                event.preventDefault();
            }
        })
    });
})
