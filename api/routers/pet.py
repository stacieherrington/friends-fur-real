from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, Form, File
from models.pet import PetOut, PetIn, PetsList, PetUpdate
from queries.pet import PetQueries
from .auth import authenticator
from .s3 import upload_to_s3
from queries.rescue import RescueQueries


router = APIRouter(tags=["Pets"])
not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get("/api/pets/{pet_id}/", response_model=PetOut, summary="Detail a Pet")
def get_pet(pet_id: str, queries: PetQueries = Depends()):
    response = queries.get_pet(pet_id)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.post(
    "/api/pets/",
    summary="create a pet  ----> management",
    description="auto get staff/admin's rescue_id add to this new pet",
    tags=["management"],
)
def create_pet(
    name: str = Form(default=None),
    type: str | None = Form(default=None),
    breed: str | None = Form(default=None),
    age: int | None = Form(default=None),
    sex: str | None = Form(default=None),
    size: str | None = Form(default=None),
    description: str | None = Form(default=None),
    weight: int | None = Form(default=None),
    pictures: UploadFile = File(),
    primary_color: str | None = Form(default=None),
    ok_with_dogs: bool | None = Form(default=None),
    ok_with_cats: bool | None = Form(default=None),
    shots_up_to_date: bool | None = Form(default=None),
    ok_with_kids: bool | None = Form(default=None),
    spayed_neutered: bool | None = Form(default=None),
    house_trained: bool | None = Form(default=None),
    special_needs: bool | None = Form(default=None),
    queries: PetQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    pet = PetIn(
        name=name,
        type=type,
        breed=breed,
        age=age,
        sex=sex,
        size=size,
        description=description,
        weight=weight,
        primary_color=primary_color,
        ok_with_dogs=ok_with_dogs,
        ok_with_cats=ok_with_cats,
        shots_up_to_date=shots_up_to_date,
        ok_with_kids=ok_with_kids,
        spayed_neutered=spayed_neutered,
        house_trained=house_trained,
        special_needs=special_needs,
        is_adopted=False,
    )
    if pictures.filename:
        pet.pictures = upload_to_s3(account["id"], pictures.file, pictures.filename)
    response = queries.create_pet(pet, rescue_id)
    if response:
        return response
    else:
        raise HTTPException(400, "something went wrong!")


@router.get(
    "/api/pets/",
    response_model=PetsList,
    summary="List all Pets that is not adopted",
)
def list_pets(
    pet_queries: PetQueries = Depends(),
    rescue_queries: RescueQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    print(account)
    if account is None:
        pets = pet_queries.list_pets()
    else:
        try:
            rescues = rescue_queries.sort_rescues_by_distance(account["id"])
            pets = []
            for rescue in rescues:
                pets = pets + rescue.pets
        except KeyError:
            pets = pet_queries.list_pets()
    return PetsList(pets=pets)


@router.delete(
    "/api/pets/{pet_id}/",
    summary="delete a pet  ----> management",
    tags=["management"],
)
def delete_pet(
    pet_id: str,
    queries: PetQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    elif not queries.rescue_own_pet(pet_id, account["rescue_id"]):
        raise not_authorized
    response = queries.delete_pet(pet_id)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.put("/api/pets/{pet_id}/")
def update_pet(
    pet_id: str,
    name: str = Form(default=None),
    type: str | None = Form(default=None),
    breed: str | None = Form(default=None),
    age: int | None = Form(default=None),
    sex: str | None = Form(default=None),
    size: str | None = Form(default=None),
    description: str | None = Form(default=None),
    weight: int | None = Form(default=None),
    pictures: UploadFile = File(),
    primary_color: str | None = Form(default=None),
    ok_with_dogs: bool | None = Form(default=None),
    ok_with_cats: bool | None = Form(default=None),
    shots_up_to_date: bool | None = Form(default=None),
    ok_with_kids: bool | None = Form(default=None),
    spayed_neutered: bool | None = Form(default=None),
    house_trained: bool | None = Form(default=None),
    special_needs: bool | None = Form(default=None),
    queries: PetQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    elif not queries.rescue_own_pet(pet_id, account["rescue_id"]):
        raise not_authorized
    pet = PetUpdate(
        name=name,
        type=type,
        breed=breed,
        age=age,
        sex=sex,
        size=size,
        description=description,
        weight=weight,
        primary_color=primary_color,
        ok_with_dogs=ok_with_dogs,
        ok_with_cats=ok_with_cats,
        shots_up_to_date=shots_up_to_date,
        ok_with_kids=ok_with_kids,
        spayed_neutered=spayed_neutered,
        house_trained=house_trained,
        special_needs=special_needs,
        is_adopted=False,
    )
    if pictures.filename:
        pet.pictures = upload_to_s3(account["id"], pictures.file, pictures.filename)
    response = queries.update_pet(pet_id, pet)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.get("/api/random/pets/", response_model=PetsList)
def get_three_random_pets(queries: PetQueries = Depends()):
    return PetsList(pets=queries.get_three_random_pets())


@router.get(
    "/api/rescues/{rescue_id}/pets/",
    response_model=PetsList,
    summary="List Pets by rescue_id",
)
def list_rescue_pets(rescue_id: str, queries: PetQueries = Depends()):
    return PetsList(pets=queries.list_rescue_pets(rescue_id))


@router.get(
    "/api/manage/pets/",
    response_model=PetsList,
    summary="List all Pets that belong to staff/admin's rescue ----> management",
    tags=["management"],
)
def list_rescue_pets(
    queries: PetQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    return PetsList(pets=queries.list_rescue_pets(rescue_id))
