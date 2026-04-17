import { createClient } from "@/lib/supabase/server";
import { ToggleContactButton } from "./ToggleContactButton";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-heading text-brand-dark mb-8 uppercase">Contact Messages</h1>

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Message</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-brand-dark whitespace-nowrap">
                      {msg.name}
                    </td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      <a href={`mailto:${msg.email}`} className="text-brand-orange hover:underline">{msg.email}</a>
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-md truncate">
                      {msg.question}
                    </td>
                    <td className="p-4">
                      <ToggleContactButton id={msg.id} initialStatus={msg.contacted} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
