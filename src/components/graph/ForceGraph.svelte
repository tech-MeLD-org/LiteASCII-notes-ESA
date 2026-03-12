<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { GraphNode, GraphEdge, ForceGraphOptions } from "../../types/graph";

  interface Props {
    nodes: GraphNode[];
    edges: GraphEdge[];
    width?: number;
    height?: number;
    options?: ForceGraphOptions;
    onNodeClick?: (node: GraphNode) => void;
    class?: string;
  }

  let {
    nodes,
    edges,
    width = 400,
    height = 400,
    options = {},
    onNodeClick,
    class: className = ""
  }: Props = $props();

  let containerEl: HTMLDivElement;
  let simulation: any = null;

  const defaultOptions: ForceGraphOptions = {
    linkDistance: 80,
    chargeStrength: -300,
    collisionRadius: 10,
    centerStrength: 0.05
  };

  const opts = { ...defaultOptions, ...options };

  onMount(() => {
    if (!nodes.length || !containerEl) return;

    let cleanupFn = () => {};

    Promise.all([
      import("d3-force"),
      import("d3-selection"),
      import("d3-zoom"),
      import("d3-drag"),
    ]).then(
      ([
        {
          forceSimulation,
          forceLink,
          forceManyBody,
          forceX,
          forceY,
          forceCollide,
        },
        { select },
        { zoom },
        { drag },
      ]) => {
        // Prepare node data
        const nodeData = nodes.map((n, i) => ({
          ...n,
          index: i,
          x: n.x || 0,
          y: n.y || 0,
          vx: 0,
          vy: 0,
        }));

        // Prepare link data
        const linkData = edges.map((e) => ({
          source: typeof e.source === 'number' ? e.source : nodeData.findIndex(n => n.id === e.source),
          target: typeof e.target === 'number' ? e.target : nodeData.findIndex(n => n.id === e.target),
        })).filter(l => l.source >= 0 && l.target >= 0);

        // Create SVG
        const svg = select(containerEl)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
          .style("display", "block");

        const g = svg.append("g");

        // Zoom behavior
        const zoomFn = zoom()
          .scaleExtent([0.2, 5])
          .on("zoom", (e: any) => g.attr("transform", e.transform));
        svg.call(zoomFn as any).on("dblclick.zoom", null);

        // Create links
        const linkSel = g
          .append("g")
          .selectAll("line")
          .data(linkData)
          .join("line")
          .attr("stroke", "var(--border-color, #303032)")
          .attr("stroke-width", 2)
          .attr("opacity", 0.6);

        // Create nodes
        const nodeSel = g
          .append("g")
          .selectAll("g")
          .data(nodeData)
          .join("g")
          .attr("cursor", "pointer")
          .call(
            drag()
              .on("start", (evt: any, d: any) => {
                if (!evt.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              })
              .on("drag", (evt: any, d: any) => {
                d.fx = evt.x;
                d.fy = evt.y;
              })
              .on("end", (evt: any, d: any) => {
                if (!evt.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              }) as any,
          );

        // Node circles
        nodeSel
          .append("circle")
          .attr("r", (d: any) => d.r || 5)
          .attr("fill", (d: any) => d.color || "var(--primary, #e74c3c)")
          .attr("stroke", "var(--border-color, #303032)")
          .attr("stroke-width", 2);

        // Node labels
        nodeSel
          .append("text")
          .text((d: any) => d.label)
          .attr("dy", (d: any) => (d.r || 5) + 15)
          .attr("text-anchor", "middle")
          .attr("fill", "var(--text-main, #e8e8e6)")
          .attr("font-family", "'Courier New', monospace")
          .attr("font-size", "11px");

        // Click handler
        if (onNodeClick) {
          nodeSel.on("click", (_: any, d: any) => {
            onNodeClick(d as GraphNode);
          });
        }

        // Simulation
        simulation = forceSimulation(nodeData)
          .force(
            "link",
            forceLink(linkData)
              .id((d: any) => d.index)
              .distance(opts.linkDistance || 80)
              .strength(1),
          )
          .force("charge", forceManyBody().strength(opts.chargeStrength || -300))
          .force("x", forceX(0).strength(opts.centerStrength || 0.05))
          .force("y", forceY(0).strength(opts.centerStrength || 0.05))
          .force(
            "collide",
            forceCollide()
              .radius((d: any) => (d.r || 5) + (opts.collisionRadius || 10))
              .strength(0.8),
          )
          .on("tick", () => {
            linkSel
              .attr("x1", (d: any) => d.source.x)
              .attr("y1", (d: any) => d.source.y)
              .attr("x2", (d: any) => d.target.x)
              .attr("y2", (d: any) => d.target.y);
            nodeSel.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
          });

        cleanupFn = () => {
          if (simulation) simulation.stop();
          if (containerEl) select(containerEl).select("svg").remove();
        };
      },
    );

    return () => cleanupFn();
  });
</script>

<div bind:this={containerEl} class="w-full h-full {className}"></div>