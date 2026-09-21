document.addEventListener("DOMContentLoaded", () => {
    // elemen
    const createForm = document.getElementById("create-product-form");
    const editForm = document.getElementById("edit-form");

    const createModal = document.getElementById("crud-modal");
    const editModal = document.getElementById("edit-modal");

    const productTableBody = document.getElementById("product-table-body");
    const alertContainer = document.getElementById("alert-container");

    const name = document.getElementById("create-name");
    const stock = document.getElementById("create-stock");
    const price = document.getElementById("create-price");
    const size = document.getElementById("create-size");
    const description = document.getElementById("create-description");

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

    function handleCloseCreateModal() {
        if (
            name.value.trim() !== "" ||
            stock.value !== "" ||
            price.value !== "" ||
            size.value !== "" ||
            description.value.trim() !== ""
        ) {
            const confirmCancel = confirm(
                "Yakin ingin membatalkan?"
            );

            if (!confirmCancel) {
                return;
            }
        }

        closeModal(createModal);
    }

    // Create produk

    document.getElementById("btn-add-product").addEventListener("click", () => {
        closeModal(editModal);
        openModal(createModal);
    });

    document.getElementById("btn-close-modal").addEventListener("click", () => {
        handleCloseCreateModal();
    });

    document
        .getElementById("btn-cancel-modal")
        .addEventListener("click", () => {
            handleCloseCreateModal();
        });

    createForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const errors = {
            name: document.getElementById("create-name-error"),
            stock: document.getElementById("create-stock-error"),
            price: document.getElementById("create-price-error"),
            size: document.getElementById("create-size-error"),
            description: document.getElementById("create-description-error"),
        };

        let hasError = false;

        // Reset semua error
        Object.values(errors).forEach((error) => {
            error.textContent = "";
            error.classList.add("hidden");
        });

        // Validasi
        if (!name.value.trim()) {
            errors.name.textContent = "nama produk wajib diisi.";
            errors.name.classList.remove("hidden");
            hasError = true;
        }

        if (stock.value === "") {
            errors.stock.classList.remove("hidden");
            hasError = true;
        }

        if (!price.value) {
            errors.price.classList.remove("hidden");
            hasError = true;
        }

        if (!size.value) {
            errors.size.classList.remove("hidden");
            hasError = true;
        }

        if (!description.value.trim()) {
            errors.description.classList.remove("hidden");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const data = {
            name: name.value,
            price: price.value,
            size: size.value,
            description: description.value,
            stock: stock.value,
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
                if (response.status === 422) {
                    const message =
                        result.errors?.name?.[0] ||
                        result.message ||
                        "Nama produk sudah digunakan.";

                    errors.name.textContent = message;
                    errors.name.classList.remove("hidden");

                    return;
                }

                throw new Error(
                    result.message || "Failed to create product"
                );
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
    const editNameWarning = document.getElementById("edit-name-warning");
    const editSize = document.getElementById("edit-size");
    const editDescription = document.getElementById("edit-description");

    function openEditModal(button) {
        closeModal(createModal);

        editForm.dataset.productId = button.dataset.productId;

        editName.value = button.dataset.productName;
        editPrice.value = button.dataset.productPrice;
        editSize.value = button.dataset.productSize;
        editDescription.value = button.dataset.productDescription;

        editNameWarning.textContent = "";
        editNameWarning.classList.add("hidden");
        openModal(editModal);
    }

    function handleCloseEditModal() {
        if (
            editName.value.trim() !== "" ||
            editPrice.value !== "" ||
            editSize.value !== "" ||
            editDescription.value.trim() !== ""
        ) {
            const confirmCancel = confirm(
                "Yakin ingin membatalkan?"
            );

            if (!confirmCancel) {
                return;
            }
        }

        closeModal(editModal);
    }

    document.getElementById("btn-close-edit").addEventListener("click", () => {
        handleCloseEditModal();
    });

    document.getElementById("btn-cancel-edit").addEventListener("click", () => {
        handleCloseEditModal();
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
                if (response.status === 422 && result.errors?.name) {
                    editNameWarning.textContent = result.errors.name[0];
                    editNameWarning.classList.remove("hidden");
                    return;
                }

                throw new Error(
                    result.message || "Failed to update product"
                );
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

            <td class="px-6 py-4">
                <button
                    type="button"
                    class="btn-stock font-medium hover:underline"
                    data-product-id="${product.id}"
                    data-product-name="${product.name}"
                    data-product-size="${product.size}"
                    data-product-stock="${product.stock?.quantity ?? 0}"
                    data-product-price="${product.price}"
                    data-product-description="${product.description ?? ''}"
                    data-stock-id="${product.stock?.id ?? ''}">
                    ${product.stock?.quantity ?? 0}
                </button>
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
