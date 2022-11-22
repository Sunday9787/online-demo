<template>
  <app-page>
    <h1>User</h1>
    <svg id="table" />
  </app-page>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'UserIndex',
  mounted() {
    const defs = d3.select('#table').append('defs')
    d3.select('#table').attr('height', '500px').attr('width', '500px')
    defs
      .append('pattern')
      .attr('id', 'smallGrid')
      .attr('width', 10)
      .attr('height', 10)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('path')
      .attr('d', 'M 10 0 L 0 0 L 0 10')
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('stroke', 'rgba(207, 207, 207, 0.3)')
    const gridPattern = defs
      .append('pattern')
      .attr('id', 'grid')
      .attr('width', 50)
      .attr('height', 50)
      .attr('patternUnits', 'userSpaceOnUse')

    gridPattern.append('rect').attr('width', 50).attr('height', 50).attr('fill', 'url(#smallGrid)')

    gridPattern
      .append('path')
      .attr('d', 'M 50 0 L 0 0 L 0 50')
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('stroke', 'rgba(186, 186, 186, 0.5)')

    d3.select('#table').append('rect').attr('width', '100%').attr('height', '100%').attr('fill', 'url(#grid)')
    d3.select('#table')
      .append('path')
      .attr('d', 'M 500 0 L 500 500 L 0 500')
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('stroke', 'rgba(186, 186, 186, 0.5)')
  }
}
</script>
