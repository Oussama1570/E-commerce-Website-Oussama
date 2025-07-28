function AuthLogin() {
  return (
    <div className="space-y-4 bg-white shadow p-6 rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded bg-blue-50"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded bg-blue-50"
      />
      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition">
        Sign In
      </button>
    </div>
  );
}
export default AuthLogin;
