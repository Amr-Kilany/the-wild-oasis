import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // 1. CHECK FOR DEMO USER
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email === "user@demo.com") {
    throw new Error("Action not allowed in Demo Mode");
  }

  // https://caurnyeduepaddkaykzd.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin

  let query;

  if (!id) {
    // CREATE
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  } else {
    // EDIT
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    // Throwing error.message to catch RLS policies in the UI
    throw new Error(error.message);
  }

  // 2.Upload the image to Supabase Storage

  // If the image is already in Supabase Storage, we don't need to upload it again
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if the image upload fails

  if (storageError) {
    console.log(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  // 1. CHECK FOR DEMO USER
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email === "user@demo.com") {
    throw new Error("Action not allowed in Demo Mode");
  }

  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    // Throwing error.message to catch RLS policies in the UI
    throw new Error(error.message);
  }
}
