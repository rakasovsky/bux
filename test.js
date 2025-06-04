const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType('custom/hero-block', {
  edit: ({ attributes, setAttributes }) => {
    return (
      <div className="hero_block" style={{ display: 'flex', gap: '20px' }}>
        <div className="hero_one" style={{ flex: 1 }}>
          <RichText
            tagName="h1"
            value={attributes.title}
            onChange={(title) => setAttributes({ title })}
            placeholder="Введіть заголовок"
          />
          <RichText
            tagName="p"
            className="normal"
            value={attributes.description}
            onChange={(description) => setAttributes({ description })}
            placeholder="Введіть опис"
          />
          <div className="hero_btns" style={{ display: 'flex', gap: '10px' }}>
            <RichText
              tagName="a"
              className="golden btn"
              href={attributes.programLink}
              value="Переглянути програму"
              onChange={(programLink) => setAttributes({ programLink })}
              placeholder="Посилання на програму"
            />
            <RichText
              tagName="a"
              className="combi btn"
              href={attributes.consultationLink}
              value="Персональна консультація"
              onChange={(consultationLink) => setAttributes({ consultationLink })}
              placeholder="Посилання на консультацію"
            />
          </div>
        </div>
        <div className="hero_two" style={{ flex: 1 }}>
          <MediaUpload
            onSelect={(media) => setAttributes({ 
              imageUrl: media.url,
              imageAlt: media.alt 
            })}
            type="image"
            value={attributes.imageUrl}
            render={({ open }) => (
              <Button onClick={open}>
                {!attributes.imageUrl ? (
                  'Завантажити зображення'
                ) : (
                  <img 
                    src={attributes.imageUrl} 
                    alt={attributes.imageAlt} 
                    style={{ maxWidth: '100%' }}
                  />
                )}
              </Button>
            )}
          />
        </div>
      </div>
    );
  },
  save: ({ attributes }) => {
    return (
      <div className="hero_block">
        <div className="hero_one">
          <h1>{attributes.title}</h1>
          <p className="normal">{attributes.description}</p>
          <div className="hero_btns">
            <a href={attributes.programLink} className="golden btn">
              Переглянути програму
            </a>
            <a href={attributes.consultationLink} className="combi btn">
              <span>Персональна консультація</span>
            </a>
          </div>
        </div>
        <div className="hero_two">
          {attributes.imageUrl && (
            <img 
              src={attributes.imageUrl} 
              alt={attributes.imageAlt} 
            />
          )}
        </div>
      </div>
    );
  }
});