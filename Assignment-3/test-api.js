const BASE_URL = 'http://localhost:5000';

async function runTests() {
  const headers = { 'Content-Type': 'application/json' };

  // Step 1: POST /api/products
  console.log('Step 1: POST /api/products');
  const postBody = {
    name: 'Marker Set',
    sku: 'STNY-MK-999',
    category: 'Stationery',
    price: 250,
    quantity: 30,
    reorderLevel: 10,
    supplier: 'Camlin'
  };

  const postRes = await fetch(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify(postBody)
  });

  const postData = await postRes.json();
  console.log('Status:', postRes.status);
  console.log('Response:', JSON.stringify(postData, null, 2));

  if (postRes.status === 409) {
    console.log('The SKU already exists. Please delete that product or change the SKU.');
    return;
  }

  const savedId = postData._id;
  if (!savedId) {
    console.error('Failed to get saved _id from POST response');
    return;
  }

  // Step 2: PUT /api/products/<saved _id>
  console.log(`\nStep 2: PUT /api/products/${savedId}`);
  const putBody = {
    name: 'Marker Set',
    sku: 'STNY-MK-999',
    category: 'Stationery',
    price: 300,
    quantity: 45
  };

  const putRes = await fetch(`${BASE_URL}/api/products/${savedId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(putBody)
  });

  const putData = await putRes.json();
  console.log('Status:', putRes.status);
  console.log('Response:', JSON.stringify(putData, null, 2));

  // Step 3: PATCH /api/products/<saved _id>/stock with body {"change":10}
  console.log(`\nStep 3: PATCH /api/products/${savedId}/stock`);
  const patchRes1 = await fetch(`${BASE_URL}/api/products/${savedId}/stock`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ change: 10 })
  });

  const patchData1 = await patchRes1.json();
  console.log('Status:', patchRes1.status);
  console.log('Response:', JSON.stringify(patchData1, null, 2));

  // Step 4: PATCH /api/products/<saved _id>/stock with body {"change":-1000}
  console.log(`\nStep 4: PATCH /api/products/${savedId}/stock`);
  const patchRes2 = await fetch(`${BASE_URL}/api/products/${savedId}/stock`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ change: -1000 })
  });

  const patchData2 = await patchRes2.json();
  console.log('Status:', patchRes2.status);
  console.log('Response:', JSON.stringify(patchData2, null, 2));

  // Step 5: DELETE /api/products/<saved _id>
  console.log(`\nStep 5: DELETE /api/products/${savedId}`);
  const deleteRes = await fetch(`${BASE_URL}/api/products/${savedId}`, {
    method: 'DELETE',
    headers
  });

  const deleteData = await deleteRes.json();
  console.log('Status:', deleteRes.status);
  console.log('Response:', JSON.stringify(deleteData, null, 2));
}

runTests().catch((err) => {
  console.error('Test execution error:', err.message);
  process.exit(1);
});

