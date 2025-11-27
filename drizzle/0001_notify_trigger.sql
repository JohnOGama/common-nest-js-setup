-- ============================================
-- Create NOTIFY trigger function
-- ============================================
CREATE OR REPLACE FUNCTION notify_product_changes()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'product_changes',  
    json_build_object(
      'table', 'product',
      'operation', TG_OP,
      'before', OLD,
      'after', NEW
    )::text
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Create Trigger on "product" table
-- ============================================
DROP TRIGGER IF EXISTS product_changes_trigger ON product;

CREATE TRIGGER product_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON product
FOR EACH ROW
EXECUTE FUNCTION notify_product_changes();
