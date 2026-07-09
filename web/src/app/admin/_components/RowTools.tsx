"use client";

import { moveItem, deleteItem } from "../actions";
import { IcUp, IcDown, IcTrash } from "./fields";

/** Reorder (up/down) + delete controls for a collection row. */
export function RowTools({
  type, id, isFirst, isLast,
}: {
  type: string; id: string; isFirst: boolean; isLast: boolean;
}) {
  return (
    <div className="adm-item-tools">
      <form action={moveItem} className="adm-inline-form">
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="dir" value="up" />
        <button type="submit" className="adm-iconbtn" disabled={isFirst} aria-label="Naikkan"><IcUp /></button>
      </form>
      <form action={moveItem} className="adm-inline-form">
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="dir" value="down" />
        <button type="submit" className="adm-iconbtn" disabled={isLast} aria-label="Turunkan"><IcDown /></button>
      </form>
      <form action={deleteItem} className="adm-inline-form"
        onSubmit={(e) => { if (!confirm("Hapus item ini? Tindakan ini tidak bisa dibatalkan.")) e.preventDefault(); }}>
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="adm-iconbtn danger" aria-label="Hapus"><IcTrash /></button>
      </form>
    </div>
  );
}
