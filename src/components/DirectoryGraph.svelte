<script>
    import { onMount } from "svelte";

    // 接收由 Astro 处理好的树状结构数组
    export let data = [];

    let containerEl;
    let simulation;

    // 状态控制：默认只展开 root
    let expanded = new Set(["root"]);

    onMount(() => {
        if (!containerEl || !data.length) return;

        let cleanupFn = () => {};

        Promise.all([
            import("d3-force"),
            import("d3-selection"),
            import("d3-zoom"),
            import("d3-drag"),
        ]).then(([d3Force, { select }, { zoom }, { drag }]) => {
            const width = containerEl.clientWidth;
            const height = containerEl.clientHeight;

            // 建立快速查找字典
            const nodeMap = new Map();
            const childrenMap = new Map();

            data.forEach((d) => {
                // 给每个节点附上初始物理坐标，初始均设为中心
                nodeMap.set(d.id, { ...d, x: 0, y: 0, vx: 0, vy: 0 });
                if (!childrenMap.has(d.parentId))
                    childrenMap.set(d.parentId, []);
                childrenMap.get(d.parentId).push(d.id);
            });

            const svg = select(containerEl)
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr(
                    "viewBox",
                    `${-width / 2} ${-height / 2} ${width} ${height}`,
                )
                .style("display", "block");

            const g = svg.append("g");
            const linkGroup = g.append("g");
            const nodeGroup = g.append("g");

            const zoomFn = zoom()
                .scaleExtent([0.2, 5])
                .on("zoom", (e) => g.attr("transform", e.transform));
            svg.call(zoomFn).on("dblclick.zoom", null);

            // 物理引擎配置
            simulation = d3Force
                .forceSimulation()
                .force(
                    "link",
                    d3Force
                        .forceLink()
                        .id((d) => d.id)
                        .distance(80)
                        .strength(1),
                )
                .force("charge", d3Force.forceManyBody().strength(-300)) // 强斥力，让炸开的效果更明显
                .force(
                    "collide",
                    d3Force
                        .forceCollide()
                        .radius((d) => (d.type === "folder" ? 30 : 15))
                        .strength(0.8),
                )
                .force("x", d3Force.forceX(0).strength(0.05))
                .force("y", d3Force.forceY(0).strength(0.05));

            // 核心动态更新函数
            function updateGraph() {
                let visibleNodes = [];
                let visibleLinks = [];
                let queue = ["root"];

                // 广度优先遍历，找出所有应显示的节点
                while (queue.length > 0) {
                    let currId = queue.shift();
                    let node = nodeMap.get(currId);
                    if (!node) continue;

                    visibleNodes.push(node);

                    if (expanded.has(currId)) {
                        let children = childrenMap.get(currId) || [];
                        children.forEach((cid) => {
                            let cnode = nodeMap.get(cid);
                            // 【细胞分裂效果】：如果是刚展开的子节点，让它从父节点的当前坐标点诞生
                            if (
                                !visibleNodes.includes(cnode) &&
                                (!cnode.x || (cnode.x === 0 && cnode.y === 0))
                            ) {
                                cnode.x = node.x + (Math.random() - 0.5) * 10;
                                cnode.y = node.y + (Math.random() - 0.5) * 10;
                            }
                            visibleLinks.push({ source: currId, target: cid });
                            queue.push(cid);
                        });
                    }
                }

                // 在 updateGraph 函数内部增加颜色计算
                const colorScale = (d) => {
                    const depth = d.id.split("/").length;
                    // 越深颜色越亮，文件夹和文件色相区分
                    if (d.type === "folder") {
                        return `hsl(6, 70%, ${Math.min(20 + depth * 12, 60)}%)`; // 红色系文件夹
                    }
                    return `hsl(210, 10%, ${Math.max(80 - depth * 10, 40)}%)`; // 灰白色系文件
                };

                // 修改半径计算：根据子节点数量动态调整小球体积
                const getRadius = (d) => {
                    if (d.id === "root") return 30;
                    if (d.type === "folder") {
                        const childCount = childrenMap.get(d.id)?.length || 0;
                        return 15 + Math.min(childCount * 2, 20); // 子节点越多球越大
                    }
                    return 6; // 文件保持小巧
                };

                // ── 渲染连线 ──
                const linkSel = linkGroup
                    .selectAll("line")
                    .data(visibleLinks, (d) =>
                        d.source.id
                            ? d.source.id + "-" + d.target.id
                            : d.source + "-" + d.target,
                    )
                    .join("line")
                    .attr("stroke", "var(--border)")
                    .attr("stroke-width", 2)
                    .attr("opacity", 0.6);

                // ── 渲染节点 ──
                const nodeSel = nodeGroup
                    .selectAll("g.node-group")
                    .data(visibleNodes, (d) => d.id)
                    .join(
                        (enter) => {
                            const el = enter
                                .append("g")
                                .attr("class", "node-group")
                                .attr("cursor", "pointer")
                                .call(
                                    drag()
                                        .on("start", (evt, d) => {
                                            if (!evt.active)
                                                simulation
                                                    .alphaTarget(0.3)
                                                    .restart();
                                            d.fx = d.x;
                                            d.fy = d.y;
                                        })
                                        .on("drag", (evt, d) => {
                                            d.fx = evt.x;
                                            d.fy = evt.y;
                                        })
                                        .on("end", (evt, d) => {
                                            if (!evt.active)
                                                simulation.alphaTarget(0);
                                            d.fx = null;
                                            d.fy = null;
                                        }),
                                );

                            // 绘制圆圈：文件夹较大且有红色边框，文件较小且是灰白色
                            // 在 join 部分更新 circle 属性
                            el.append("circle")
                                .attr("r", (d) => getRadius(d))
                                .attr("fill", (d) => colorScale(d))
                                .attr("stroke", (d) =>
                                    d.type === "folder"
                                        ? "rgba(255,255,255,0.1)"
                                        : "none",
                                )
                                .attr("stroke-width", 1);

                            // 绘制文字标签
                            el.append("text")
                                .text((d) => d.label)
                                .attr("dy", (d) =>
                                    d.type === "folder" ? 35 : 20,
                                )
                                .attr("text-anchor", "middle")
                                .attr("fill", "var(--text, #eee)")
                                .attr("font-family", "'Courier New', monospace")
                                .attr("font-size", (d) =>
                                    d.type === "folder" ? "12px" : "10px",
                                );

                            // 【点击事件】：文件夹分裂/收缩，文档直接跳转
                            el.on("click", (evt, d) => {
                                if (d.type === "file") {
                                    window.location.href = d.href;
                                } else {
                                    if (expanded.has(d.id)) {
                                        expanded.delete(d.id); // 收缩
                                    } else {
                                        expanded.add(d.id); // 展开
                                    }
                                    updateGraph(); // 触发引擎重绘
                                }
                            });

                            return el;
                        },
                        (update) => update,
                        (exit) => exit.remove(),
                    );

                // 重置物理引擎数据并注入活力
                simulation.nodes(visibleNodes).on("tick", () => {
                    linkSel
                        .attr("x1", (d) => d.source.x)
                        .attr("y1", (d) => d.source.y)
                        .attr("x2", (d) => d.target.x)
                        .attr("y2", (d) => d.target.y);
                    nodeSel.attr(
                        "transform",
                        (d) => `translate(${d.x},${d.y})`,
                    );
                });

                simulation.force("link").links(visibleLinks);
                simulation.alpha(1).restart();
            }

            // 首次渲染
            updateGraph();

            cleanupFn = () => {
                simulation.stop();
                select(containerEl).select("svg").remove();
            };
        });

        return () => cleanupFn();
    });
</script>

<div class="graph-full-wrap" bind:this={containerEl}></div>

<style>
    .graph-full-wrap {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
    }
</style>
