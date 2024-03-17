$('.habit-status-dropdown').on('change', function(){
    let id = this.id;
    let status = $(this).val();

    window.location.href = `http://localhost:4000/main/toggleStatus?id=${id}&status=${status}`;
});