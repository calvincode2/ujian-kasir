document.addEventListener("DOMContentLoaded", () => {
    // elemen
    const createForm = document.getElementById("create-product-form");
    const editForm = document.getElementById("edit-form");

    const createModal = document.getElementById("crud-modal");
    const editModal = document.getElementById("edit-modal");

    const productTableBody = document.getElementById("product-table-body");
    const alertContainer = document.getElementById("alert-container");

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    // helper
    function showAlert(message, type = "success") {
        const alertClass =
            type === "success"
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-red-100 text-red-800 border-red-300";

        alertContainer.innerHTML = `
            <div
                class="flex items-center p-4 mb-4 text-sm rounded-lg border ${alertClass}"
                role="alert">

                <span class="font-medium mr-2">
                    ${type === "success" ? "Success!" : "Error!"}
                </span>

                ${message}

            </div>
        `;

        setTimeout(() => {
            alertContainer.innerHTML = "";
        }, 3000);
    }

    function openModal(modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModal(modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        modal.setAttribute("aria-hidden", "true");
    }

    // Create produk

    document.getElementById("btn-add-product").addEventListener("click", () => {
        closeModal(editModal);
        openModal(createModal);
    });

    document.getElementById("btn-close-modal").addEventListener("click", () => {
        closeModal(createModal);
    });

    document
        .getElementById("btn-cancel-modal")
        .addEventListener("click", () => {
            closeModal(createModal);
        });

    createForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            name: document.getElementById("create-name").value,
            price: document.getElementById("create-price").value,
            size: document.getElementById("create-size").value,
            description: document.getElementById("create-description").value,
        };

        try {
            const response = await fetch("/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create product");
            }

            addProductToTable(result.data);

            closeModal(createModal);

            createForm.reset();

            showAlert(result.message);
        } catch (error) {
            console.error(error);

            showAlert(error.message, "error");
        }
    });

    // Edit produk

    const editName = document.getElementById("edit-name");
    const editPrice = document.getElementById("edit-price");
    const editSize = document.getElementById("edit-size");
    const editDescription = document.getElementById("edit-description");

    function openEditModal(button) {
        closeModal(createModal);

        editForm.dataset.productId = button.dataset.productId;
        editName.value = button.dataset.productName;
        editPrice.value = button.dataset.productPrice;
        editSize.value = button.dataset.productSize;
        editDescription.value = button.dataset.productDescription;
        openModal(editModal);
    }

    document.getElementById("btn-close-edit").addEventListener("click", () => {
        closeModal(editModal);
    });

    document.getElementById("btn-cancel-edit").addEventListener("click", () => {
        closeModal(editModal);
    });

    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = editForm.dataset.productId;
        const data = {
            name: editName.value,
            price: editPrice.value,
            size: editSize.value,
            description: editDescription.value,
        };

        try {
            const response = await fetch(`/admin/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update product");
            }

            updateProductRow(result.data);

            closeModal(editModal);
            editForm.reset();
            delete editForm.dataset.productId;

            showAlert(result.message);
        } catch (error) {
            console.error(error);
            showAlert(error.message, "error");
        }
    });

    // Delete produk

    async function deleteProduct(id) {
        try {
            const response = await fetch(`/admin/products/${id}`, {
                method: "DELETE",

                headers: {
                    Accept: "application/json",

                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete product");
            }

            const row = document.querySelector(`[data-product-row="${id}"]`);
            if (row) {
                row.remove();
            }

            updateRowNumbers();

            showAlert(result.message);
        } catch (error) {
            console.error(error);

            showAlert(error.message, "error");
        }
    }

    function addProductToTable(product) {
        const rowNumber = productTableBody.rows.length + 1;

        const row = document.createElement("tr");

        row.setAttribute("data-product-row", product.id);

        row.className =
            "bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium transition";

        row.innerHTML = `

            <th
                scope="row"
                class="row-number px-6 py-4 font-medium text-heading whitespace-nowrap">

                ${rowNumber}

            </th>


            <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap">

                ${product.name}

            </th>


            <td class="px-6 py-4 whitespace-nowrap">

                ${product.size}

            </td>


            <td class="px-6 py-4 whitespace-nowrap">

                ${product.price}

            </td>


            <td class="px-6 py-4">

                ${product.description}

            </td>


            <td class="px-6 py-4 text-right whitespace-nowrap">

                <div class="flex justify-end gap-7">

                    <button
                        type="button"
                        class="btn-edit-product font-medium text-blue-600 hover:underline"

                        data-product-id="${product.id}"

                        data-product-name="${product.name}"

                        data-product-price="${product.price}"

                        data-product-size="${product.size}"

                        data-product-description="${product.description}">

                        Edit

                    </button>


                    <button
                        type="button"
                        class="btn-delete-product font-medium text-red-600 hover:underline"

                        data-product-id="${product.id}">

                        Delete

                    </button>

                </div>

            </td>
        `;

        productTableBody.appendChild(row);

        updateRowNumbers();
    }

    function updateProductRow(product) {
        const row = document.querySelector(
            `[data-product-row="${product.id}"]`,
        );

        if (!row) return;

        const cells = row.children;

        cells[1].textContent = product.name;
        cells[2].textContent = product.size;
        cells[3].textContent = product.price;
        cells[4].textContent = product.description;

        const editButton = row.querySelector(".btn-edit-product");

        editButton.dataset.productName = product.name;
        editButton.dataset.productPrice = product.price;
        editButton.dataset.productSize = product.size;
        editButton.dataset.productDescription = product.description;
    }

    function updateRowNumbers() {
        const rows = productTableBody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            const numberCell = row.querySelector(".row-number");

            numberCell.textContent = index + 1;
        });
    }

    productTableBody.addEventListener("click", (event) => {
        const editButton = event.target.closest(".btn-edit-product");
        if (editButton) {
            openEditModal(editButton);
            return;
        }

        const deleteButton = event.target.closest(".btn-delete-product");
        if (deleteButton) {
            const id = deleteButton.dataset.productId;
            const confirmed = confirm("Yakin ingin menghapus produk ini?");
            if (confirmed) {
                deleteProduct(id);
            }
        }
    });
});
