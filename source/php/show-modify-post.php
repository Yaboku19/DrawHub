<div class="container mt-2 mb-5">
    <div class="justify-content-center border bg-light">
        <div class="p-5">
            <form action="modify-post.php?postId=<?php echo($templateParams["post_info"]["postID"]) ?>" method="POST" enctype="multipart/form-data">
                <p class="fs-3 text-center"><strong><label for="post">Modifica il tuo post:</label></strong></p>
                <hr id="formContentDivider" />
                <div id="formContent">
                    <textarea class="form-control" id="post" name="descrizione" rows="4"><?php echo($templateParams["post_info"]["description"]) ?></textarea>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                    <input name="delete" type="checkbox" class="btn-check" id="deletePost" autocomplete="off">
                    <label class="btn btn-danger" for="deletePost">Elimina post</label>
                    <button type="submit" data-toggle="button" class="btn btn-outline-primary"
                        name="submit">Conferma</button>
                </div>
            </form>
        </div>
    </div>
</div>