<div class="container mt-2 mb-5">
    <div class="justify-content-center border bg-secondary bg-opacity-10">
        <div class="p-5 text-center">
            <p class="text-danger"> <?php echo $error; ?> </p>
            <form action="showAddPost.php" method="POST" enctype="multipart/form-data">
                <label for="post" class="fs-3 fw-bold">Il Tuo Nuovo Post:</label>
                <hr />
                <label for="imgpost" class="fw-bold my-1">Immagine:</label><input type="file" name="imgpost" id="imgpost" class="form-control"/>
                <label for="post" class="fw-bold my-1">Descrizione:</label>
                <textarea class="form-control" id="post" name="post" rows="4"></textarea>
                <p class="text-muted small">Il post puo' essere lungo massimo 200 caratteri.</p>

                <hr />
                <div class="d-flex justify-content-end">
                    <button type="submit" data-toggle="button" class="btn btn-outline-primary" name="submit">Posta</button>
                </div>
            </form>
        </div>
    </div>
</div>