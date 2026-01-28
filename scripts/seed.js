import { createClient } from "@supabase/supabase-js";
import { bookings } from "../src/data/data-bookings.js";
import { cabins } from "../src/data/data-cabins.js";
import { guests } from "../src/data/data-guests.js";

// --- CONFIG ---
// We will pass these secrets via GitHub Actions environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // IMPORTANT: NOT the Anon key

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// --- MAIN LOGIC ---
async function deleteAll() {
  console.log("Deleting old data...");
  const { error: error1 } = await supabase
    .from("bookings")
    .delete()
    .gt("id", 0);
  if (error1) console.error("Bookings delete error:", error1.message);

  const { error: error2 } = await supabase.from("guests").delete().gt("id", 0);
  if (error2) console.error("Guests delete error:", error2.message);

  const { error: error3 } = await supabase.from("cabins").delete().gt("id", 0);
  if (error3) console.error("Cabins delete error:", error3.message);
}

async function uploadAll() {
  console.log("Uploading fresh data...");

  // 1. Create Guests
  const { error: errorGuests } = await supabase.from("guests").insert(guests);
  if (errorGuests) console.error("Guests upload error:", errorGuests.message);

  // 2. Create Cabins
  const { error: errorCabins } = await supabase.from("cabins").insert(cabins);
  if (errorCabins) console.error("Cabins upload error:", errorCabins.message);

  // 3. Create Bookings (with recalculated IDs)
  // We need to fetch the IDs we just created
  const { data: dbGuests } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const { data: dbCabins } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  if (!dbGuests || !dbCabins) {
    console.error("Could not retrieve new IDs");
    return;
  }

  const allGuestIds = dbGuests.map((g) => g.id);
  const allCabinIds = dbCabins.map((c) => c.id);

  const finalBookings = bookings.map((booking) => {
    // Logic to map the fixed IDs in data file to real DB IDs
    const guestId = allGuestIds.at(booking.guestId - 1);
    const cabinId = allCabinIds.at(booking.cabinId - 1);

    return { ...booking, guestId, cabinId };
  });

  const { error: errorBookings } = await supabase
    .from("bookings")
    .insert(finalBookings);

  if (errorBookings)
    console.error("Bookings upload error:", errorBookings.message);
  else console.log("Data successfully reset for today!");
}

async function run() {
  await deleteAll();
  await uploadAll();
}

run();
