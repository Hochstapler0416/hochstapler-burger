import { apiUrl } from "@/lib/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2, Check, X, Eye, EyeOff, LogOut, ChevronDown, ChevronRight, Star, Upload, ImageIcon } from "lucide-react";
import { useUpload } from "@workspace/object-storage-web";

interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  badge: string;
  isAvailable: boolean;
  sortOrder: number;
}

interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
  sortOrder: number;
  isVisible: boolean;
  items: MenuItem[];
}

interface Special {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  imageUrl: string;
  type: string;
  isVisible: boolean;
  sortOrder: number;
}

function authHeaders() {
  const token = localStorage.getItem("admin_token");
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

/* ── Edit Item Row ──────────────────────────────────────── */

function EditItemRow({ item, onSave, onDelete, onCancel }: {
  item: Partial<MenuItem>;
  onSave: (data: Partial<MenuItem>) => void;
  onDelete?: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(item.name ?? "");
  const [price, setPrice] = useState(item.price ?? "");
  const [description, setDescription] = useState(item.description ?? "");
  const [badge, setBadge] = useState(item.badge ?? "");

  return (
    <div className="bg-accent/10 border border-accent/30 p-4 rounded-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="z.B. Hochstapler" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Preis</label>
          <input value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="z.B. 15,00 €" />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Beschreibung</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none" placeholder="Zutaten oder Beschreibung..." />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Kennzeichnung</label>
        <input value={badge} onChange={e => setBadge(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="z.B. Vegan, Beliebt, Signature..." />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => onSave({ name, price, description, badge })} disabled={!name.trim()} className="flex items-center gap-1.5 px-4 py-2 bg-accent text-primary font-bold text-xs uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-40">
          <Check size={14} /> Speichern
        </button>

        <button onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 border border-border text-muted-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-colors">
          <X size={14} /> Abbrechen
        </button>

        {onDelete && (
          <button onClick={onDelete} className="flex items-center gap-1.5 px-4 py-2 bg-coral text-white font-bold text-xs uppercase tracking-wider hover:bg-coral/90 transition-colors ml-auto">
            <Trash2 size={14} /> Löschen
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Category Section ───────────────────────────────────── */

function CategorySection({ cat, token, onRefresh }: {
  cat: MenuCategory;
  token: string;
  onRefresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);

  async function toggleCategoryVisibility() {
    await fetch(apiUrl(`/api/admin/categories/${cat.id}`), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ isVisible: !cat.isVisible }),
    });
    onRefresh();
  }

  async function saveItem(itemId: number, data: Partial<MenuItem>) {
    setSaving(true);
    await fetch(apiUrl(`/api/admin/items/${itemId}`), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    setEditingItemId(null);
    setSaving(false);
    onRefresh();
  }

  async function addItem(data: Partial<MenuItem>) {
    setSaving(true);
    await fetch(apiUrl("/api/admin/items"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        categoryId: cat.id,
        name: data.name,
        description: data.description ?? "",
        price: data.price ?? "",
        badge: data.badge ?? "",
        isAvailable: true,
        sortOrder: cat.items.length + 1,
      }),
    });
    setAddingNew(false);
    setSaving(false);
    onRefresh();
  }

  async function deleteItem(itemId: number) {
    if (!confirm("Gericht wirklich löschen?")) return;
    setSaving(true);
    await fetch(apiUrl(`/api/admin/items/${itemId}`), {
      method: "DELETE",
      headers: authHeaders(),
    });
    setEditingItemId(null);
    setSaving(false);
    onRefresh();
  }

  async function toggleItemAvailable(item: MenuItem) {
    await fetch(apiUrl(`/api/admin/items/${item.id}`), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ isAvailable: !item.isAvailable }),
    });
    onRefresh();
  }

  const typeLabel = cat.type === "drink" ? "Getränke" : "Speisen";
  const typeColor = cat.type === "drink" ? "bg-blue-100 text-blue-700" : "bg-accent/20 text-primary";

  return (
    <div className={`border ${cat.isVisible ? "border-border" : "border-border opacity-60"} bg-card`}>
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-3 flex-1 text-left">
          {open ? <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" /> : <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />}
          <div>
            <span className="font-bold text-primary">{cat.name}</span>
            <span className="ml-3 text-xs text-muted-foreground">{cat.items.length} Einträge</span>
          </div>
          <span className={`ml-3 text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${typeColor}`}>{typeLabel}</span>
        </button>

        <button onClick={toggleCategoryVisibility} title={cat.isVisible ? "Sichtbar — klicken zum Ausblenden" : "Ausgeblendet — klicken zum Einblenden"} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 transition-colors ${cat.isVisible ? "text-accent hover:text-accent/70" : "text-muted-foreground hover:text-primary"}`}>
          {cat.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
          <span className="hidden sm:inline">{cat.isVisible ? "Sichtbar" : "Ausgeblendet"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border">
          {cat.items.length === 0 && !addingNew && (
            <p className="px-5 py-4 text-muted-foreground text-sm">Noch keine Einträge.</p>
          )}

          {cat.items.map((item) => (
            <div key={item.id} className="border-b border-border last:border-b-0">
              {editingItemId === item.id ? (
                <div className="p-4">
                  <EditItemRow item={item} onSave={(data) => saveItem(item.id, data)} onDelete={() => deleteItem(item.id)} onCancel={() => setEditingItemId(null)} />
                </div>
              ) : (
                <div className={`flex items-start justify-between gap-4 px-5 py-3 hover:bg-muted/30 transition-colors ${!item.isAvailable ? "opacity-50" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-primary text-sm">{item.name}</span>
                      {item.badge && <span className="text-xs px-2 py-0.5 bg-accent/20 text-primary font-bold uppercase tracking-wider">{item.badge}</span>}
                      {!item.isAvailable && <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground font-bold uppercase tracking-wider">Nicht verfügbar</span>}
                    </div>
                    {item.description && <p className="text-muted-foreground text-xs mt-0.5 truncate max-w-lg">{item.description}</p>}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {item.price && <span className="font-bold text-sm text-primary mr-2 whitespace-nowrap">{item.price}</span>}
                    <button onClick={() => toggleItemAvailable(item)} title={item.isAvailable ? "Als nicht verfügbar markieren" : "Als verfügbar markieren"} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                      {item.isAvailable ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button onClick={() => { setEditingItemId(item.id); setAddingNew(false); }} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                      <Pencil size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {addingNew ? (
            <div className="p-4 border-t border-border">
              <EditItemRow item={{}} onSave={addItem} onCancel={() => setAddingNew(false)} />
            </div>
          ) : (
            <div className="px-5 py-3 border-t border-border">
              <button onClick={() => { setAddingNew(true); setEditingItemId(null); }} disabled={saving} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/70 transition-colors">
                <Plus size={16} /> Neues Gericht / Getränk hinzufügen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Image Upload ───────────────────────────────────── */

function ImageUploadField({ imageUrl, onImageUrl }: {
  imageUrl: string;
  onImageUrl: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(imageUrl);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { uploadFile, isUploading, progress } = useUpload({
    basePath: apiUrl("/api/storage"),
    onSuccess: (response) => {
      const servedUrl = apiUrl(`/api/storage/objects${response.objectPath.replace(/^\/objects/, "")}`);
      setPreview(servedUrl);
      onImageUrl(servedUrl);
      setUploadError(null);
    },
    onError: (err) => {
      setUploadError(err.message);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Nur Bilddateien erlaubt (JPG, PNG, WebP).");
      return;
    }

    setUploadError(null);
    await uploadFile(file);
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Foto</label>
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-20 h-20 border border-border bg-muted flex items-center justify-center overflow-hidden">
          {preview ? <img src={preview} alt="Vorschau" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-muted-foreground" />}
        </div>

        <div className="flex-1 min-w-0">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />

          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="flex items-center gap-1.5 px-3 py-2 border border-border text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors disabled:opacity-50 w-full justify-center">
            <Upload size={13} />
            {isUploading ? `Hochladen… ${progress}%` : preview ? "Foto ändern" : "Foto auswählen"}
          </button>

          {isUploading && (
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}

          {uploadError && <p className="text-xs text-coral mt-1">{uploadError}</p>}

          {preview && !isUploading && (
            <button type="button" onClick={() => { setPreview(""); onImageUrl(""); }} className="text-xs text-muted-foreground mt-1 hover:text-coral transition-colors">
              Foto entfernen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Edit Special Row ───────────────────────────────────── */

function EditSpecialRow({ special, onSave, onDelete, onCancel }: {
  special: Partial<Special>;
  onSave: (data: Partial<Special>) => void;
  onDelete?: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(special.title ?? "");
  const [subtitle, setSubtitle] = useState(special.subtitle ?? "");
  const [description, setDescription] = useState(special.description ?? "");
  const [price, setPrice] = useState(special.price ?? "");
  const [imageUrl, setImageUrl] = useState(special.imageUrl ?? "");
  const [type, setType] = useState(special.type ?? "food");

  return (
    <div className="bg-accent/10 border border-accent/30 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Titel *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="z.B. Memphis Monatsspecial" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Preis</label>
          <input value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="z.B. €16,50" />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Untertitel</label>
        <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="z.B. Acai, Granatapfelkerne, Heidelbeeren" />
      </div>

      <div className="mb-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Beschreibung</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none" placeholder="Beschreibung des Specials..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <ImageUploadField imageUrl={imageUrl} onImageUrl={setImageUrl} />
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Typ</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent bg-background">
            <option value="food">Speise / Burger</option>
            <option value="drink">Drink / Cocktail</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => onSave({ title, subtitle, description, price, imageUrl, type })} disabled={!title.trim()} className="flex items-center gap-1.5 px-4 py-2 bg-accent text-primary font-bold text-xs uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-40">
          <Check size={14} /> Speichern
        </button>

        <button onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 border border-border text-muted-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-colors">
          <X size={14} /> Abbrechen
        </button>

        {onDelete && (
          <button onClick={onDelete} className="flex items-center gap-1.5 px-4 py-2 bg-coral text-white font-bold text-xs uppercase tracking-wider hover:bg-coral/90 transition-colors ml-auto">
            <Trash2 size={14} /> Löschen
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Specials Tab ───────────────────────────────────────── */

function SpecialsTab({ token, onRefresh }: { token: string; onRefresh?: () => void }) {
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadSpecials = useCallback(async () => {
    try {
      const res = await fetch(apiUrl("/api/admin/specials"), { headers: authHeaders() });
      const data = await res.json() as Special[];
      setSpecials(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSpecials();
  }, [loadSpecials]);

  async function saveSpecial(id: number, data: Partial<Special>) {
    setSaving(true);
    await fetch(apiUrl(`/api/admin/specials/${id}`), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    setEditingId(null);
    setSaving(false);
    loadSpecials();
  }

  async function addSpecial(data: Partial<Special>) {
    setSaving(true);
    await fetch(apiUrl("/api/admin/specials"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        title: data.title ?? "",
        subtitle: data.subtitle ?? "",
        description: data.description ?? "",
        price: data.price ?? "",
        imageUrl: data.imageUrl ?? "",
        type: data.type ?? "food",
        isVisible: true,
        sortOrder: specials.length + 1,
      }),
    });
    setAddingNew(false);
    setSaving(false);
    loadSpecials();
    onRefresh?.();
  }

  async function deleteSpecial(id: number) {
    if (!confirm("Special wirklich löschen?")) return;
    setSaving(true);
    await fetch(apiUrl(`/api/admin/specials/${id}`), {
      method: "DELETE",
      headers: authHeaders(),
    });
    setSaving(false);
    loadSpecials();
  }

  async function toggleVisible(s: Special) {
    await fetch(apiUrl(`/api/admin/specials/${s.id}`), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ isVisible: !s.isVisible }),
    });
    loadSpecials();
  }

  if (loading) return <div className="py-16 text-center text-muted-foreground">Lade Specials...</div>;

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-accent/10 border border-accent/30 p-4 text-sm text-primary">
        <strong>Top of the Month & Specials:</strong> Hier kannst du monatliche Specials verwalten. Sie erscheinen unter <code className="bg-muted px-1">/specials</code> auf der Website. Du kannst Titel, Beschreibung, Preis, Bild-URL und Typ (Speise / Drink) festlegen.
      </div>

      {specials.length === 0 && !addingNew && (
        <p className="py-8 text-center text-muted-foreground">Noch keine Specials. Füge dein erstes hinzu!</p>
      )}

      {specials.map((s) => (
        <div key={s.id} className={`border border-border bg-card ${!s.isVisible ? "opacity-60" : ""}`}>
          {editingId === s.id ? (
            <div className="p-4">
              <EditSpecialRow special={s} onSave={(data) => saveSpecial(s.id, data)} onDelete={() => deleteSpecial(s.id)} onCancel={() => setEditingId(null)} />
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4 px-5 py-4">
              <div className="flex gap-4 items-start flex-1 min-w-0">
                {s.imageUrl && (
                  <img src={s.imageUrl} alt={s.title} className="w-16 h-16 object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-bold text-primary">{s.title}</span>
                    <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider ${s.type === "drink" ? "bg-blue-100 text-blue-700" : "bg-accent/20 text-primary"}`}>
                      {s.type === "drink" ? "Drink" : "Speise"}
                    </span>
                    {!s.isVisible && <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground font-bold uppercase tracking-wider">Ausgeblendet</span>}
                  </div>
                  {s.subtitle && <p className="text-muted-foreground text-xs">{s.subtitle}</p>}
                  {s.description && <p className="text-muted-foreground text-xs mt-1 truncate max-w-lg">{s.description}</p>}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {s.price && <span className="font-bold text-sm text-primary mr-2 whitespace-nowrap">{s.price}</span>}
                <button onClick={() => toggleVisible(s)} title={s.isVisible ? "Ausblenden" : "Einblenden"} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                  {s.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => setEditingId(s.id)} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                  <Pencil size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {addingNew ? (
        <div className="border border-border bg-card p-4">
          <EditSpecialRow special={{ type: "food" }} onSave={addSpecial} onCancel={() => setAddingNew(false)} />
        </div>
      ) : (
        <button onClick={() => { setAddingNew(true); setEditingId(null); }} disabled={saving} className="flex items-center gap-2 px-5 py-4 border border-dashed border-border text-muted-foreground hover:text-primary hover:border-accent transition-colors text-sm font-semibold">
          <Plus size={16} /> Neues Special / Top of the Month hinzufügen
        </button>
      )}
    </div>
  );
}

/* ── Main Dashboard ─────────────────────────────────────── */

export default function AdminDashboardPage() {
  const [, navigate] = useLocation();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"food" | "drink" | "specials">("food");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState<"food" | "drink">("food");

  const token = localStorage.getItem("admin_token");

  const loadMenu = useCallback(async () => {
    try {
      const res = await fetch(apiUrl("/api/admin/menu"), { headers: authHeaders() });
      if (res.status === 401) {
        navigate("/admin");
        return;
      }
      const data = await res.json() as MenuCategory[];
      setCategories(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    loadMenu();
  }, [token, loadMenu, navigate]);

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  }

  async function addCategory() {
    if (!newCatName.trim()) return;

    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    await fetch(apiUrl("/api/admin/categories"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        name: newCatName.trim(),
        slug,
        type: newCatType,
        sortOrder: categories.length + 1,
      }),
    });

    setNewCatName("");
    setShowAddCategory(false);
    loadMenu();
  }

  const filtered = categories.filter(c => activeTab !== "specials" && c.type === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://hochstapler-burger.de/wp-content/uploads/2021/04/Logo_sticky.png" alt="Hochstapler Burger" className="h-8 w-auto brightness-0 invert" />
            <div>
              <h1 className="font-serif text-lg text-background leading-none">Karte & Specials verwalten</h1>
              <p className="text-primary-foreground/50 text-xs mt-0.5">Mitarbeiter-Bereich</p>
            </div>
          </div>

          <button onClick={logout} className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
            <LogOut size={16} /> Abmelden
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-0 border-b border-border mb-6">
          {(["food", "drink", "specials"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-1.5 px-6 py-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}>
              {tab === "specials" && <Star size={14} />}
              {tab === "food" ? "Speisekarte" : tab === "drink" ? "Getränkekarte" : "Top of the Month"}
            </button>
          ))}
        </div>

        {activeTab === "specials" && <SpecialsTab token={token ?? ""} />}

        {activeTab !== "specials" && (
          <>
            <div className="bg-accent/10 border border-accent/30 p-4 mb-6 text-sm text-primary">
              <strong>So funktioniert es:</strong> Klicke auf eine Kategorie um sie aufzuklappen. Dann kannst du Preise und Beschreibungen bearbeiten, Gerichte als "Nicht verfügbar" markieren oder neue Einträge hinzufügen.
            </div>

            {loading ? (
              <div className="text-center py-16 text-muted-foreground">Lade Karte...</div>
            ) : (
              <div className="flex flex-col gap-2">
                {filtered.map((cat) => (
                  <CategorySection key={cat.id} cat={cat} token={token ?? ""} onRefresh={loadMenu} />
                ))}

                {showAddCategory ? (
                  <div className="border border-border bg-card p-5">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-primary mb-3">Neue Kategorie</h3>
                    <div className="flex gap-3 flex-wrap">
                      <input value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Name der Kategorie" className="flex-1 min-w-48 border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent" onKeyDown={e => e.key === "Enter" && addCategory()} />

                      <select value={newCatType} onChange={e => setNewCatType(e.target.value as "food" | "drink")} className="border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent bg-background">
                        <option value="food">Speisen</option>
                        <option value="drink">Getränke</option>
                      </select>

                      <button onClick={addCategory} disabled={!newCatName.trim()} className="flex items-center gap-2 px-4 py-2 bg-accent text-primary font-bold text-xs uppercase tracking-wider hover:bg-accent/90 disabled:opacity-40">
                        <Check size={14} /> Erstellen
                      </button>

                      <button onClick={() => { setShowAddCategory(false); setNewCatName(""); }} className="flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted">
                        <X size={14} /> Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowAddCategory(true)} className="flex items-center gap-2 px-5 py-4 border border-dashed border-border text-muted-foreground hover:text-primary hover:border-accent transition-colors text-sm font-semibold">
                    <Plus size={16} /> Neue Kategorie hinzufügen
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}