import { Grid, Paper, Typography } from "@mui/material";

import type { FeatureCollection, Feature, GeoJsonProperties } from "geojson";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Layer, PathOptions, LatLngBoundsExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import type { JSX } from "react";

/* ================= TYPES ================= */

type AreaData = {
  area_code: string;
  total: number;
  urgent: number;
  processing: number;
  completed: number;
};

type RiskMapProps = {
  data: AreaData[];
  geojson: FeatureCollection;
};

type SummaryProps = {
  summary: {
    total: number;
    urgent: number;
    processing: number;
    completed: number;
  };
};

/* ================= CONSTANT ================= */

/* 📍 Center สกลนคร */
const SAKON_CENTER: [number, number] = [17.167, 104.147];

/* 🔒 Bounds จังหวัด */
const SAKON_BOUNDS: LatLngBoundsExpression = [
  [16.7, 103.6], // SW
  [17.8, 104.7], // NE
];

/* ================= MAP ================= */

function RiskMap({ data, geojson }: RiskMapProps) {
  /* ---------- COLOR ---------- */
  const getColor = (areaCode: string): string => {
    const area = data.find((a) => a.area_code === areaCode);
    if (!area) return "#ccc";

    if (area.urgent > 0) return "#ef4444";
    if (area.processing > 0) return "#f97316";
    if (area.completed > 0) return "#22c55e";

    return "#e5e7eb";
  };

  /* ---------- STYLE ---------- */
  const style = (feature?: Feature): PathOptions => {
    if (!feature) {
      return {
        fillColor: "#ccc",
        weight: 1,
        color: "#fff",
        fillOpacity: 0.5,
      };
    }

    const props = feature.properties as GeoJsonProperties;
    const code = (props?.area_code as string) ?? "";

    return {
      fillColor: getColor(code),
      weight: 1,
      color: "#fff",
      fillOpacity: 0.85,
    };
  };

  /* ---------- POPUP ---------- */
  const onEachFeature = (feature: Feature, layer: Layer) => {
    const props = feature.properties as GeoJsonProperties;

    const code = (props?.area_code as string) ?? "";
    const name = (props?.area_name as string) ?? "ไม่ทราบพื้นที่";

    const area = data.find((a) => a.area_code === code);

    layer.bindPopup(`
      <b>${name}</b><br/>
      ทั้งหมด: ${area?.total ?? 0}<br/>
      🔴 ด่วน: ${area?.urgent ?? 0}<br/>
      🟠 ดำเนินการ: ${area?.processing ?? 0}<br/>
      🟢 เสร็จสิ้น: ${area?.completed ?? 0}
    `);
  };

  return (
    <MapContainer
      center={SAKON_CENTER}
      zoom={9}
      minZoom={8}
      maxZoom={12}
      maxBounds={SAKON_BOUNDS}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <GeoJSON data={geojson} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}

/* ================= SUMMARY ================= */

function MapSummary({ summary }: SummaryProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">สรุปทั้งจังหวัด</Typography>

      <Typography color="error">🔴 ด่วน: {summary.urgent}</Typography>

      <Typography color="warning.main">
        🟠 ดำเนินการ: {summary.processing}
      </Typography>

      <Typography color="success.main">
        🟢 เสร็จสิ้น: {summary.completed}
      </Typography>

      <Typography>ทั้งหมด: {summary.total}</Typography>
    </Paper>
  );
}

/* ================= MAIN ================= */

export default function AreaRiskTab(): JSX.Element {
  /* MOCK DATA */
  const data: AreaData[] = [
    {
      area_code: "4701",
      total: 120,
      urgent: 10,
      processing: 50,
      completed: 60,
    },
  ];

  /* ⚠️ ใส่ GeoJSON สกลนครจริง */
  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  const summary = {
    total: 120,
    urgent: 10,
    processing: 50,
    completed: 60,
  };

  return (
    <Grid container spacing={2}>
      {/* MAP */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Paper sx={{ p: 2, height: 500 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Heatmap พื้นที่เสี่ยง
          </Typography>

          <RiskMap data={data} geojson={geojson} />
        </Paper>
      </Grid>

      {/* SUMMARY */}
      <Grid size={{ xs: 12, md: 3 }}>
        <MapSummary summary={summary} />
      </Grid>

      {/* TOP RISK */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography>Top Risk Areas</Typography>
        </Paper>
      </Grid>

      {/* REPEAT */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography>Repeat Cases</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
