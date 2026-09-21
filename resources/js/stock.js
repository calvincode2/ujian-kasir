document.addEventListener("DOMContentLoaded", () => {
    const alertContainer = document.getElementById("alert-container");

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

    function handleCloseRestockModal() {
        if (restockQuantity.value !== "") {
            const confirmCancel = confirm(
                "Yakin ingin membatalkan?"
            );

            if (!confirmCancel) {
                return;
            }
        }

        closeRestockModal();
    }

    const restockModal = document.getElementById("restock-modal");
    const restockForm = document.getElementById("restock-form");
    const restockName = document.getElementById("restock-name");
    const restockSize = document.getElementById("restock-size");
    const restockCurrentStock = document.getElementById("restock-current-stock");
    const restockQuantity = document.getElementById("restock-quantity");
    const restockPrice = document.getElementById("restock-price");
    const restockStatus = document.getElementById("restock-status");
    const restockDescription = document.getElementById("restock-description");

    const btnCancelRestock = document.getElementById("btn-cancel-restock");
    const btnCloseRestock = document.getElementById("btn-close-restock");
    const btnSubmitRestock = document.getElementById("btn-submit-restock");

    const productTableBody = document.getElementById("product-table-body");

    function openRestockModal(product) {

        restockName.value = product.name;
        restockSize.value = product.size;
        restockCurrentStock.value = product.stock;
        restockQuantity.value = "";
        restockPrice.value = product.price;
        restockStatus.value = "";
        restockDescription.value = product.description ?? "";

        restockForm.dataset.productId = product.id;

        restockModal.classList.remove("hidden");
        restockModal.classList.add("flex");
    }

    function closeRestockModal() {

        restockModal.classList.add("hidden");
        restockModal.classList.remove("flex");

        restockForm.reset();

        delete restockForm.dataset.productId;
    }

    productTableBody.addEventListener("click", (event) => {
        const button = event.target.closest(".btn-stock");

        if (!button) return;

        const product = {
            id: button.dataset.productId,
            name: button.dataset.productName,
            size: button.dataset.productSize,
            price: button.dataset.productPrice,
            stock: button.dataset.productStock,
            description: button.dataset.productDescription,
        };

        openRestockModal(product);
    });

    btnCancelRestock.addEventListener("click", handleCloseRestockModal);
    btnCloseRestock.addEventListener("click", handleCloseRestockModal);


    // RESTOCK PRODUCT

   restockForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const productId = restockForm.dataset.productId;
        const quantity = restockQuantity.value;

        if (!productId) {
            showAlert("Product ID tidak ditemukan.", "error");
            return;
        }

        if (!quantity) {
            showAlert("Quantity belum diisi.", "error");
            return;
        }

        btnSubmitRestock.disabled = true;

        try {
            const response = await fetch(
                `/admin/products/${productId}/restock`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                    body: JSON.stringify({
                        quantity: quantity,
                        status: restockStatus.value
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                showAlert(result.message || "Gagal memperbarui stock.", "error");
                return;
            }

            const stockButton = document.querySelector(
                `.btn-stock[data-product-id="${productId}"]`
            );

            if (stockButton) {
                stockButton.textContent = result.data.quantity;

                // Update data stock juga supaya saat modal dibuka lagi,
                // Current Stock menggunakan angka terbaru.
                stockButton.dataset.productStock = result.data.quantity;
            }

            showAlert(result.message, "success");

            closeRestockModal();

        } catch (error) {
            console.error("Error:", error);
            showAlert("Terjadi kesalahan pada server.", "error");

        } finally {
            btnSubmitRestock.disabled = false;
        }
    });

});
