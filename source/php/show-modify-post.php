<div class="container mt-2 mb-5">
    <div class="justify-content-center border bg-light">
        <div class="p-5">
            <?php echo "modify-post.php?postId=" . $templateParams["postID"]; ?>
            <form action="modify-post.php" method="POST">
                <p class="fs-3 text-center"><strong><label for="post">Modifica il tuo post:</label></strong></p>
                <hr id="formContentDivider" />
                <div id="formContent">
                    <input type="text" class="form-control" id="post" name="descrizione" value="<?php echo($templateParams["description"]) ?>" >
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                    <button type="submit" data-toggle="button" class="btn btn-outline-danger" id="deletePost"
                        name="delete">Elimina post</button>
                    <button type="submit" data-toggle="button" class="btn btn-outline-primary"
                        name="submit">Conferma</button>
                </div>
                <input type="hidden" name="postId" value="<?php echo($templateParams["postID"]) ?>">
            </form>
            <div>
                <p class="text-danger m-0" id="error-text"></p>
            </div>
        </div>
    </div>
</div>