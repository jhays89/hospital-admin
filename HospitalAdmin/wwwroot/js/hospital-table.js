var module = {
    data: [],
    editId: null,
    getData() {
        $.ajax({
            context: this,
            type: "get",
            url: "api/hospitals",
            success: this.setData
        })
        .then(this.setView);
    },

    setData(response) {
        for (var i = 0; i < response.length; i++) {
            this.data.push(this.mapData(response[i]));
        }
    },

    mapData(item) {
        return {
            id: item.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            name: item.name,
            patientCount: item.patientCount,
            totalRoomCount: item.totalRoomCount
        };
    },

    setView() {
        var table = $(".hospital-table");

        for (var i = 0; i < this.data.length; i++) {
            var row = this.getTableRow(this.data[i]);
            table.append(row);
        }

        this.attachEventListeners();
        this.showCard("table");
    },

    getTableRow(item) {
        return `<div data-id="${item.id}" class="table-row">
                    <div class="table-column table-column-name">${item.name}</div>
                    <div class="table-column table-column-patient-count">${item.patientCount}</div>
                    <div class="table-column table-column-room-count">${item.totalRoomCount}</div>
                    <div class="table-column">
                        <i data-id='${item.id}' class="control  edit fa fa-edit" title="Edit"></i>
                        <i data-id='${item.id}' class="control  delete fa fa-trash" title="Delete"></i>
                    </div>
                </div>`;
    },

    attachEventListeners() {
        var context = this;

        this.addEventListener(".edit.control", function (event) { context.openEditor(event, context) });
        this.addEventListener(".delete.control", function (event) { context.deleteHospital(event, context) });
        this.addEventListener(".add-hospital", function () { context.openAddMenu(context) });
        this.addEventListener(".cancel-update-button", function () { context.closeEditor(context) });
        this.addEventListener(".cancel-add-button", function () { context.closeAddMenu(context) });
        this.addEventListener(".save-hospital", function () { context.saveHospital(context) });
        this.addEventListener(".update-hospital", function () { context.updateHospital(context) });
    },

    addEventListener(selector, callback) {
        var controls = $(`.hospital-table-module ${selector}`);

        for (var i = 0; i < controls.length; i++) {
            var control = controls[i];

            control.addEventListener("click", callback);
        }
    },

    showCard(type) {
        var card = $(`.hospital-table-module .card.${type}`);
        card.show();
    },

    hideAllCards() {
        var cards = $(`.hospital-table-module .card`);

        for (var i = 0; i < cards.length; i++) {
            $(cards[i]).hide();
        }
    },

    openEditor(event, context) {
        var control = $(event.currentTarget);
        var id = parseInt(control.attr("data-id"));
        context.editId = id;

        var hospital;

        for (var i = 0; i < context.data.length; i++) {
            if (context.data[i].id === id) {
                hospital = context.data[i];
            }
        }

        $(".update-name").val(hospital.name);
        $(".update-patient-count").val(hospital.patientCount);
        $(".update-room-count").val(hospital.totalRoomCount);

        context.hideAllCards();
        context.hideAddButton();
        context.showCard("edit");
    },

    closeEditor(context) {
        context.hideAllCards();
        context.showAddButton();
        context.showCard("table");
    },

    openAddMenu(context) {
        context.hideAllCards();
        context.hideAddButton();
        context.showCard("add");
    },

    closeAddMenu(context) {
        $(".add-name").val("");
        $(".add-patient-count").val("");
        $(".add-room-count").val("");

        context.hideAllCards();
        $('.add-hospital').show();
        context.showCard("table");
    },

    hideAddButton() {
        $('.add-hospital').hide();
    },

    showAddButton() {
        $('.add-hospital').show();
    },

    saveHospital(context) {
        var name = $('.add-name').val();
        var patientCount = $('.add-patient-count').val();
        var roomCount = $('.add-room-count').val();

        var payload = JSON.stringify(
            {
                name: name,
                PatientCount: parseInt(patientCount),
                TotalRoomCount: parseInt(roomCount)
            }
        );

        $.ajax({
            context: this,
            type: "post",
            data: payload,
            contentType: "application/json",
            url: "api/hospitals",
            success: function (response) {
                context.showTableMessage("success", "added");
                context.updateViewWithNewHospital(response, context);
            },
            error: function (response) {
                context.showTableMessage("failed", "added");
            }
        })
    },

    updateViewWithNewHospital(response, context) {
        var newHospital = context.mapData(response);
        context.data.push(newHospital);

        var row = context.getTableRow(newHospital);
        var table = $(".hospital-table");
        table.append(row);

        $('.add-name').val("");
        $('.add-patient-count').val("");
        $('.add-room-count').val("");

        var lastRow = table.children().last();

        var editControl = lastRow.find(".edit.control")[0];
        editControl.addEventListener("click", function (event) { context.openEditor(event, context) });

        var deleteControl = lastRow.find(".delete.control")[0];
        deleteControl.addEventListener("click", function (event) { context.deleteHospital(event, context) });

        context.closeAddMenu(context);
    },

    updateViewWithUpdatedHospital(response, context) {
        var hospital;

        for (var i = 0; i < context.data.length; i++) {
            if (context.data[i].id === context.editId) {
                hospital = context.data[i];
            }
        }

        hospital.updatedAt = response.updatedAt;
        hospital.name = $(".update-name").val();
        hospital.patientCount = $(".update-patient-count").val();
        hospital.totalRoomCount = $(".update-room-count").val();

        var tableRow = $(`.table-row[data-id="${hospital.id}"]`);
        tableRow.find('.table-column-name').html(hospital.name);
        tableRow.find('.table-column-patient-count').html(hospital.patientCount);
        tableRow.find('.table-column-room-count').html(hospital.totalRoomCount);

        context.hideAllCards();
        context.showCard("table");
        context.showAddButton();
        context.editId = null;
    },

    updateHospital(context) {
        var hospital;

        for (var i = 0; i < context.data.length; i++) {
            if (context.data[i].id === context.editId) {
                hospital = context.data[i];
            }
        }

        var id = hospital.id;
        var createdAt = hospital.createdAt;
        var updatedAt = hospital.updatedAt;
        var name = $(".update-name").val();
        var patientCount = $(".update-patient-count").val();
        var roomCount = $(".update-room-count").val();

        var payload = JSON.stringify(
            {
                id: id,
                createdAt: createdAt,
                updatedAt: updatedAt,
                name: name,
                PatientCount: parseInt(patientCount),
                TotalRoomCount: parseInt(roomCount)
            }
        );

        $.ajax({
            context: this,
            type: "put",
            data: payload,
            contentType: "application/json",
            url: "api/hospitals",
            success: function (response) {
                context.showTableMessage("success", "updated");
                context.updateViewWithUpdatedHospital(response, context);
            },
            error: function (response) {
                context.showTableMessage("failed", "updated");
            }
        })
    },

    deleteHospital(event, context) {
        var control = $(event.currentTarget);
        var id = control.attr("data-id");

        $.ajax({
            context: this,
            type: "delete",
            url: `api/hospitals/${id}`,
            success: function () {
                context.showTableMessage("success", "deletion");
                context.removeHospitalFromTable(id);
            },
            error: function () {
                context.showTableMessage("failed", "deletion");
            }
        });
    },

    removeHospitalFromTable(id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === parseInt(id)) {
                this.data.splice(i, 1);
                $(`.hospital-table .table-row[data-id="${id}"]`).remove();
                break;
            }
        }
    },

    showTableMessage(responseType, messageType) {
        this.hideAllMessages();
        this.showMessage(responseType, messageType);
    },

    hideAllMessages() {
        var messages = $(".message-container .message");
        for (var i = 0; i < messages.length; i++) {
            $(messages[i]).hide();
        }
    },

    showMessage(responseType, messageType) {
        var message = $(`.message-container .message.${responseType}.${messageType}`);
        message.show();
    }
};

module.getData();