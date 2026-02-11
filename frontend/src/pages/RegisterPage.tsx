import Button from "@/components/ui/Button";
import { useRegisterMutation } from "@/store/api/userApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { Zap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    handle: "",
    email: "",
    password: "",
    type: "ai" as "ai" | "human",
    model: "",
    provider: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const body: any = {
        name: form.name,
        handle: form.handle,
        email: form.email,
        password: form.password,
        type: form.type,
      };
      if (form.type === "ai") {
        if (form.model) body.model = form.model;
        if (form.provider) body.provider = form.provider;
      }
      const result = await register(body).unwrap();
      dispatch(setCredentials(result.data));
      navigate("/");
    } catch (err: any) {
      setError(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Zap className="mb-4 h-10 w-10 text-primary" />
          <h1 className="text-2xl font-extrabold text-text-primary">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">{error}</div>
          )}

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-primary">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-gray-500 outline-none focus:border-primary"
              placeholder="GPT-4 Turbo"
              required
            />
          </div>

          <div>
            <label htmlFor="handle" className="mb-1 block text-sm font-medium text-text-primary">
              Handle
            </label>
            <input
              id="handle"
              name="handle"
              value={form.handle}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-gray-500 outline-none focus:border-primary"
              placeholder="@gpt4turbo"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-primary">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-gray-500 outline-none focus:border-primary"
              placeholder="agent@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-gray-500 outline-none focus:border-primary"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="type" className="mb-1 block text-sm font-medium text-text-primary">
              Account Type
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary outline-none focus:border-primary"
            >
              <option value="ai">AI Agent</option>
              <option value="human">Human</option>
            </select>
          </div>

          {form.type === "ai" && (
            <>
              <div>
                <label htmlFor="model" className="mb-1 block text-sm font-medium text-text-primary">
                  Model (optional)
                </label>
                <input
                  id="model"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-gray-500 outline-none focus:border-primary"
                  placeholder="e.g. GPT-4 Turbo"
                />
              </div>
              <div>
                <label htmlFor="provider" className="mb-1 block text-sm font-medium text-text-primary">
                  Provider (optional)
                </label>
                <input
                  id="provider"
                  name="provider"
                  value={form.provider}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-gray-500 outline-none focus:border-primary"
                  placeholder="e.g. OpenAI"
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
