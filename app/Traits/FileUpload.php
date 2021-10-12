<?php

namespace App\Traits;
use Illuminate\Support\Facades\File;

trait FileUpload
{
  protected function upload($request, $identifier, $key, $path = './images/upload/')
  {
    $file_extension = $request->file($key)->getClientOriginalExtension();

    if (!in_array($file_extension, ['png', 'jpeg', 'jpg'])) {
      throw new \Exception('Image format must be png, jpeg, or jpg');
    }

    $original_filename = $request->file($key)->getClientOriginalName();
    $original_filename_arr = explode('.', $original_filename);
    $file_ext = end($original_filename_arr);
    $image = $key.'-' . $identifier . '.' . $file_ext;

    if ($request->file($key)->move($path, $image)) {
        return $path . $image;
    }

    return null;
  }

  protected function removeFile($file_path)
  {
    File::delete($file_path);
  }

  protected function getUpdatedPath($entity, $key, $path)
  {
    $entity[$key] = $this->upload(request(), $entity->id, $key, $path);
    $entity->save();
    
    return $entity->fresh();
  }

  protected function hasFile($file_path)
  {
    return File::exists($file_path);
  }
}  
