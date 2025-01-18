import { Grid2, Typography } from "@mui/material"

function Services() {
  const services = [
    {
      icon: 'Images/Services/Star.png',
      title: 'Design',
      description: 'I specialize in web & mobile design, creating visually appealing, user-friendly digital experiences.'
    },
    {
      icon: 'Images/Services/Globe.png',
      title: 'User Experience Design',
      description: 'I focus on wireframing, designing structured layouts that simplify complex ideas and ensure seamless, user-centered digital experiences.'
    },
    {
      icon: 'Images/Services/Search.png',
      title: 'UX Research',
      description: 'I specialize in user experience research, collaborating on web development, and ensuring user-friendly digital products.'
    },
    {
      icon: 'Images/Services/Checks.png',
      title: 'Usability Testing',
      description: 'I perform usability testing and optimize designs websites based on real-user feedback for seamless interactions.'
    }
  ]

  return (
    <div className="container my-5 py-5" id='services'>
      <Typography variant='h4' fontWeight='bold' gutterBottom mb={3}>
        Services
      </Typography>
      <Typography variant='body1'>
        Explore my design services, from user interface and experience to prototyping and testing. Let's craft exceptional digital experiences together.
      </Typography>
      <Grid2 container spacing={5} mt={10}>
        {services.map((service, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ textAlign: 'start' }}>
            <img src={service.icon} alt={service.title} className='img-fluid mb-4' />
            <Typography variant='h5' fontWeight='bold' gutterBottom mb={3}>{service.title}</Typography>
            <Typography variant='body1'>{service.description}</Typography>
          </Grid2>
        ))}
      </Grid2>
    </div>
  )
}

export default Services