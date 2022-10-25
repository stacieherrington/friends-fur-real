import boto3
import os
from botocore.exceptions import ClientError, ParamValidationError
from fastapi import UploadFile


AWS_BUCKET_NAME = os.environ.get("AWS_BUCKET_NAME")
AWS_SERVER_PUBLIC_KEY = os.environ.get("AWS_SERVER_PUBLIC_KEY")
AWS_SERVER_SECRET_KEY = os.environ.get("AWS_SERVER_SECRET_KEY")


def upload_to_s3(user_id: str, file: UploadFile, filename: str) -> str | None:
    if (
        AWS_BUCKET_NAME is None
        or AWS_SERVER_PUBLIC_KEY is None
        or AWS_SERVER_SECRET_KEY is None
    ):
        return None
    s3_client = boto3.client(
        service_name="s3",
        aws_access_key_id=AWS_SERVER_PUBLIC_KEY,
        aws_secret_access_key=AWS_SERVER_SECRET_KEY,
    )
    try:
        file_path = f"{user_id}/{filename}"
        response = s3_client.upload_fileobj(
            file,
            AWS_BUCKET_NAME,
            file_path,
            ExtraArgs = {
                "ContentType": "image/jpg",
                "ContentDisposition": "inline; filename=filename.jpg",
            },
        )
        return file_path
    except (ClientError, ParamValidationError) as e:
        print(e)
        return None
